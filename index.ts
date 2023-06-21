import * as pulumi from "@pulumi/pulumi";
import * as grpc from "@grpc/grpc-js";
import assert = require("assert");

import * as fabric from "./protos/v1/fabric_grpc_pb";
import * as pb from "./protos/v1/fabric_pb";
import { deleteUndefined, isEqual, optionals } from "./utils";
import { join } from "path";
import { readFileSync } from "fs";

let defaultFabric =
  process.env["DEFANG_FABRIC"] || "fabric-prod1.defang.dev:443";

/** Override the default Fabric service to use for all Defang resources. */
export function setDefaultFabric(fabric: string) {
  assert(fabric, "fabric must be non-empty");
  defaultFabric = fabric;
}

// Pulumi stores the actual code of the dynamic provider in the stack. This
// means that if there's a bug in the provider, we can't fix it in existing
// stacks. To work around this, we can force an update of the provider code by
// setting the environment variable DEFANG_FORCE_UP to "true" or "1".
const forceUpdate = ["true", "1"].includes(process.env["DEFANG_FORCE_UP"]!);

// The access token is used to authenticate with the gRPC server. It can be
// passed in as an environment variable, read from the state file, or set using
// the `setAccessToken` function.
let accessToken: string | undefined;

function readAccessToken(fabric: string): string {
  const tokenDir =
    process.env["XDG_STATE_HOME"] ||
    join(process.env["HOME"]!, ".local", "state");
  const tokenPath = join(tokenDir, "defang", fabric.replace(/:\d+$/, ""));
  try {
    return readFileSync(tokenPath, "utf8").trim();
  } catch (e) {
    console.error("Please log in with the Defang CLI: defang login");
    throw e;
  }
}

function getAccessToken(fabric: string): string {
  return (
    accessToken || process.env["DEFANG_ACCESS_TOKEN"] || readAccessToken(fabric)
  );
}

/** Override the access token used to authenticate with the Fabric service. */
export function setAccessToken(token: string) {
  assert(token, "token must be non-empty");
  accessToken = token;
}

function hasPort(url: string): boolean {
  return /:\d+$/.test(url);
}

// Connect to our gRPC server
async function connect(
  fabricDNS: string
): Promise<fabric.FabricControllerClient> {
  const client = new fabric.FabricControllerClient(
    hasPort(fabricDNS) ? fabricDNS : `${fabricDNS}:443`,
    grpc.credentials.combineChannelCredentials(
      grpc.credentials.createSsl(),
      grpc.credentials.createFromMetadataGenerator((_, callback) => {
        const metadata = new grpc.Metadata();
        // TODO: automatically generate a new token once it expires
        metadata.set("authorization", "Bearer " + getAccessToken(fabricDNS));
        callback(null, metadata);
      })
    )
  );
  await new Promise<void>((resolve, reject) =>
    client.waitForReady(Date.now() + 5000, (err) =>
      err ? reject(err) : resolve()
    )
  );
  return client;
}

function convertServiceInputs(inputs: DefangServiceInputs): pb.Service {
  const service = new pb.Service();
  service.setName(inputs.name);
  service.setImage(inputs.image);
  const deploy = new pb.Deploy();
  deploy.setReplicas(inputs.deploy?.replicas ?? 1);
  if (inputs.deploy?.resources) {
    const reservations = new pb.Resource();
    reservations.setCpus(inputs.deploy.resources.reservations?.cpu ?? 0.0);
    reservations.setMemory(inputs.deploy.resources.reservations?.memory ?? 0);
    const devices = inputs.deploy.resources.reservations?.devices?.map((d) => {
      const device = new pb.Device();
      device.setCapabilitiesList(d.capabilities ?? []);
      device.setCount(d.count ?? 0);
      return device;
    });
    reservations.setDevicesList(devices ?? []);
    const resources = new pb.Resources();
    resources.setReservations(reservations);
    deploy.setResources(resources);
  }
  // if (inputs.build) {
  //   const build = new pb.Build();
  //   build.setContext(inputs.build.context); // FIXME: use createUploadURL to create a signed URL for uploading the context
  //   if (inputs.build.dockerfile) {
  //     build.setDockerfile(inputs.build.dockerfile);
  //   }
  //   service.setBuild(build);
  // }
  service.setInternal(inputs.internal ?? true);
  service.setDeploy(deploy);
  service.setPlatform(
    inputs.platform === "linux/arm64"
      ? pb.Platform.LINUX_ARM64
      : pb.Platform.LINUX_AMD64
  );
  service.setPortsList(convertPorts(inputs.ports));
  Object.entries(inputs.environment ?? {}).forEach(([key, value]) => {
    service.getEnvironmentMap().set(key, value);
  });
  service.setSecretsList(
    inputs.secrets?.map((s) => {
      const secret = new pb.Secret();
      secret.setSource(s.source);
      // secret.setTarget(s.target);
      return secret;
    }) ?? []
  );
  if (inputs.command) {
    service.setCommandList(inputs.command);
  }
  return service;
}

function dummyServiceInfo(service: pb.Service): pb.ServiceInfo {
  const info = new pb.ServiceInfo();
  info.setService(service);
  return info;
}

async function updatex(
  inputs: DefangServiceInputs,
  force: boolean = false
): Promise<pb.ServiceInfo> {
  const service = convertServiceInputs(inputs);
  const client = await connect(inputs.fabricDNS);
  try {
    // Update any secrets w/ values first in case the service update depends on them
    await Promise.all(
      inputs.secrets?.map((secret) => {
        if (secret.value === undefined) {
          return;
        }
        const sv = new pb.SecretValue();
        sv.setName(secret.source);
        sv.setValue(secret.value);
        return new Promise((resolve, reject) =>
          client.putSecret(sv, (err, res) =>
            err && !force ? reject(err) : resolve(res)
          )
        );
      }) ?? []
    );

    const result = await new Promise<pb.ServiceInfo | undefined>(
      (resolve, reject) =>
        client.update(service, (err, res) =>
          err && !force ? reject(err) : resolve(res)
        )
    );
    return result ?? dummyServiceInfo(service);
  } finally {
    client.close();
  }
}

function convertProtocol(protocol?: Protocol) {
  switch (protocol) {
    case "tcp":
      return pb.Protocol.TCP;
    case "udp":
      return pb.Protocol.UDP;
    case "http":
      return pb.Protocol.HTTP;
    case "http2":
      return pb.Protocol.HTTP2;
    case "grpc":
      return pb.Protocol.GRPC;
    default:
      return pb.Protocol.ANY;
  }
}

function convertPorts(ports: Port[] = []): pb.Port[] {
  return ports.map((p) => {
    const port = new pb.Port();
    port.setTarget(p.target);
    port.setProtocol(convertProtocol(p.protocol));
    port.setMode(p.mode === "ingress" ? pb.Mode.INGRESS : pb.Mode.HOST); // default to HOST
    return port;
  });
}

interface UnwrappedSecret {
  source: string;
  value?: string; // testing
}

interface DefangServiceInputs {
  fabricDNS: string;
  name: string;
  image: string;
  platform?: Platform;
  internal?: boolean;
  deploy?: Deploy;
  ports?: Port[];
  environment?: { [key: string]: string };
  secrets?: UnwrappedSecret[];
  // build?: Build;
  forceNewDeployment?: boolean;
  command?: string[];
}

interface DefangServiceOutputs {
  fabricDNS: string;
  service: pb.Service.AsObject; // this might contain undefined, which is not allowed
  fqdn: string;
}

function toOutputs(
  fabricDNS: string,
  service: pb.ServiceInfo,
  oldFqdn?: string
): DefangServiceOutputs {
  return {
    fabricDNS,
    service: deleteUndefined(service.getService()!.toObject()),
    fqdn: service.getFqdn() || oldFqdn!,
  };
}

const defangServiceProvider: pulumi.dynamic.ResourceProvider = {
  async check(
    olds: DefangServiceInputs,
    news: DefangServiceInputs
  ): Promise<pulumi.dynamic.CheckResult<DefangServiceInputs>> {
    // console.debug("check");
    if (!news.fabricDNS) {
      return {
        failures: [{ property: "fabricDNS", reason: "fabricDNS is required" }],
      };
    }
    if (!news.image) {
      return { failures: [{ property: "image", reason: "image is required" }] };
    }
    // TODO: validate name
    if (!news.name) {
      return { failures: [{ property: "name", reason: "name is required" }] };
    }
    if (news.deploy) {
      if (
        !Number.isInteger(news.deploy.replicas!) ||
        news.deploy.replicas! < 0
      ) {
        return {
          failures: [
            {
              property: "deploy",
              reason: "replicas must be an integer ≥ 0",
            },
          ],
        };
      }
      // TODO: validate cpu and memory > 0
    }
    for (const port of news.ports || []) {
      // port.protocol = port.protocol || "tcp"; TODO: should we set defaults here?
      if (
        port.target < 1 ||
        port.target > 32767 ||
        !Number.isInteger(port.target)
      ) {
        return {
          failures: [
            {
              property: "ports",
              reason: "target port must be an integer between 1 and 32767",
            },
          ],
        };
      }
      if (
        port.mode === "ingress" &&
        !["http", "http2", "grpc"].includes(port.protocol!)
      ) {
        return {
          failures: [
            {
              property: "ports",
              reason: "ingress ports must have protocol http, http2, or grpc",
            },
          ],
        };
      }
    }
    for (const secret of news.secrets || []) {
      // TODO: validate source name
      if (!secret.source) {
        return {
          failures: [
            {
              property: "secrets",
              reason: "secret source is required",
            },
          ],
        };
      }
    }
    // if (news.build) {
    //   if (!news.build.context) {
    //     return {
    //       failures: [
    //         {
    //           property: "build",
    //           reason: "build context is required",
    //         },
    //       ],
    //     };
    //   }
    //   if (news.build.dockerfile === "") {
    //     return {
    //       failures: [
    //         {
    //           property: "build",
    //           reason: "dockerfile cannot be empty string",
    //         },
    //       ],
    //     };
    //   }
    // }
    return { inputs: news };
  },
  async create(
    inputs: DefangServiceInputs
  ): Promise<pulumi.dynamic.CreateResult<DefangServiceOutputs>> {
    const result = await updatex(inputs);
    return {
      id: result.getService()!.getName(), // TODO: do we need to return a unique ID?
      outs: toOutputs(inputs.fabricDNS, result),
    };
  },
  async delete(id: string, olds: DefangServiceOutputs): Promise<void> {
    const serviceId = new pb.ServiceID();
    serviceId.setName(id);
    const client = await connect(olds.fabricDNS);
    try {
      await new Promise<pb.Void>((resolve, reject) =>
        client.delete(serviceId, (err, res) =>
          err ? reject(err) : resolve(res!)
        )
      );
    } finally {
      client.close();
    }
  },
  async diff(
    id: string,
    oldOutputs: DefangServiceOutputs,
    newInputs: DefangServiceInputs
  ): Promise<pulumi.dynamic.DiffResult> {
    assert.equal(id, oldOutputs.service.name);
    return {
      changes:
        newInputs.forceNewDeployment ||
        !isEqual(
          oldOutputs.service,
          convertServiceInputs(newInputs).toObject()
        ),
      replaces: forceUpdate
        ? [] // prevent calling delete
        : [
            ...optionals(oldOutputs.service.name !== newInputs.name, "name"),
            ...optionals(
              oldOutputs.fabricDNS !== newInputs.fabricDNS,
              "fabricDNS"
            ),
          ],
      // deleteBeforeReplace: false,
      // stables: [],
    };
  },
  async update(
    id: string,
    olds: DefangServiceOutputs,
    news: DefangServiceInputs
  ): Promise<pulumi.dynamic.UpdateResult<DefangServiceOutputs>> {
    assert.equal(id, olds.service.name);
    assert.equal(olds.service.name, news.name);
    assert.equal(olds.fabricDNS, news.fabricDNS);
    const result = await updatex(news, forceUpdate);
    assert.strictEqual(result.getService()?.getName(), id);
    return {
      outs: toOutputs(news.fabricDNS, result, olds.fqdn),
    };
  },
  async read(
    id: string,
    olds: DefangServiceOutputs
  ): Promise<pulumi.dynamic.ReadResult<DefangServiceOutputs>> {
    const serviceId = new pb.ServiceID();
    serviceId.setName(id);
    const client = await connect(olds.fabricDNS);
    try {
      const result = await new Promise<pb.ServiceInfo | undefined>(
        (resolve, reject) =>
          client.get(serviceId, (err, res) =>
            err && err.code !== grpc.status.NOT_FOUND //&& !forceUpdate
              ? reject(err)
              : resolve(res)
          )
      );
      return result
        ? {
            id,
            props: toOutputs(olds.fabricDNS, result),
          }
        : {};
    } finally {
      client.close();
    }
  },
};

export type Platform = "linux/arm64" | "linux/amd64" | "linux";
export type Protocol = "tcp" | "udp" | "http" | "http2" | "grpc";
export type DeviceCapability = "gpu";

export interface Port {
  target: number;
  protocol?: Protocol;
  mode?: "ingress" | "host";
}

export interface Device {
  capabilities?: DeviceCapability[];
  count?: number;
  // driver?: string; not currently supported
}

export interface Resource {
  cpu?: number /** number of vCPUs to reserve */;
  memory?: number /** number of MiB to reserve */;
  devices?: Device[];
}

export interface Deploy {
  replicas?: number;
  resources?: {
    reservations?: Resource;
    // limits?: Resource;
  };
}

export interface Secret {
  source: pulumi.Input<string> /** the name of the secret to expose as an environment variable */;
  value?: pulumi.Input<string> /** optional value of the secret; alternatively, the secret can be set via the Defang CLI */;
}

// export interface Build {
//   context: string;
//   dockerfile?: string;
// }

export interface DefangServiceArgs {
  fabricDNS?: pulumi.Input<string> /** the DNS name of the Defang Fabric service; defaults to the value of the DEFANG_FABRIC or prod, if unset */;
  name?: pulumi.Input<string> /** the name of the service; defaults to the name of the resource */;
  image: pulumi.Input<string> /** the container image to deploy */;
  platform?: pulumi.Input<Platform> /** the platform to deploy to; defaults to "linux/amd64" */;
  internal?: pulumi.Input<boolean> /** whether the service requires a public IP or not; defaults to true */;
  deploy?: pulumi.Input<Deploy> /** the optional deployment configuration */;
  ports?: pulumi.Input<pulumi.Input<Port>[]> /** the ports to expose */;
  environment?: pulumi.Input<{
    [key: string]: pulumi.Input<string>;
  }> /** the environment variables to set */;
  secrets?: pulumi.Input<
    pulumi.Input<Secret>[]
  > /** the secrets to expose as environment variables */;
  forceNewDeployment?: pulumi.Input<boolean> /** whether to force a new deployment or not; defaults to false */;
  command?: pulumi.Input<
    pulumi.Input<string>[]
  > /** the command to run; overrides the container image's CMD */;
  // build?: pulumi.Input<Build>;
}

export class DefangService extends pulumi.dynamic.Resource {
  public readonly fabricDNS!: pulumi.Output<string>; /** the DNS name of the Defang Fabric service */
  public readonly fqdn!: pulumi.Output<string>; /** the fully qualified domain name of the service */
  public readonly name!: pulumi.Output<string>; /** the name of the service */

  constructor(
    name: string,
    args: DefangServiceArgs,
    opts?: pulumi.CustomResourceOptions
  ) {
    if (!args.name) {
      args.name = name;
    }
    if (!args.fabricDNS) {
      args.fabricDNS = defaultFabric;
    }
    super(defangServiceProvider, name, { fqdn: undefined, ...args }, opts);
  }
}
