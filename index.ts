import * as grpc from "@grpc/grpc-js";
import * as pulumi from "@pulumi/pulumi";
import { readFileSync } from "fs";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { join } from "path";
import assert = require("assert");

import * as fabric from "./protos/io/defang/v1/fabric_grpc_pb";
import * as pb from "./protos/io/defang/v1/fabric_pb";
import { uploadTarball } from "./upload";
import {
  HttpUrl,
  deleteUndefined,
  isEqual,
  isValidUint,
  optionals,
  trueOr1,
} from "./utils";

let defaultFabric =
  process.env["DEFANG_FABRIC"] || "fabric-prod1.defang.dev:443";

/** Override the default Fabric service to use for all Defang resources. */
export function setDefaultFabric(fabricDns: string) {
  assert(fabricDns, "fabricDns must be non-empty");
  defaultFabric = fabricDns;
}

const debug = trueOr1(process.env["DEFANG_DEBUG"]);

// Pulumi stores the actual code of the dynamic provider in the stack. This
// means that if there's a bug in the provider, we can't fix it in existing
// stacks. To work around this, we can force an update of the provider code by
// setting the environment variable DEFANG_FORCE_UP to "true" or "1".
const forceUpdate = trueOr1(process.env["DEFANG_FORCE_UP"]);

// The access token is used to authenticate with the gRPC server. It can be
// passed in as an environment variable, read from the state file, or set using
// the `setAccessToken` function.
let accessToken: string | undefined;

function readAccessToken(fabricDns: string): string {
  const tokenDir =
    process.env["XDG_STATE_HOME"] ||
    join(process.env["HOME"]!, ".local", "state");
  const tokenPath = join(tokenDir, "defang", fabricDns.replace(/:\d+$/, ""));
  try {
    if (debug) console.debug(`Reading access token from ${tokenPath}`);
    return readFileSync(tokenPath, "utf8").trim();
  } catch (e) {
    const arg = fabricDns === defaultFabric ? "" : ` --cluster ${fabricDns}`;
    console.error("Please log in with the Defang CLI: defang login" + arg);
    throw e;
  }
}

function getAccessToken(fabricDns: string): string {
  return (
    accessToken ||
    process.env["DEFANG_ACCESS_TOKEN"] ||
    readAccessToken(fabricDns)
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
  fabricDns: string
): Promise<fabric.FabricControllerClient> {
  const withoutTenant = fabricDns.replace(/^.*@/, "");
  const client = new fabric.FabricControllerClient(
    hasPort(withoutTenant) ? withoutTenant : `${withoutTenant}:443`,
    grpc.credentials.combineChannelCredentials(
      grpc.credentials.createSsl(),
      grpc.credentials.createFromMetadataGenerator((_, callback) => {
        const metadata = new grpc.Metadata();
        // TODO: automatically generate a new token once it expires
        metadata.set("authorization", "Bearer " + getAccessToken(fabricDns));
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
  if (inputs.image) {
    service.setImage(inputs.image);
  }
  // inputs.build is handled in updatex
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
  if (inputs.healthcheck) {
    const healthcheck = new pb.HealthCheck();
    healthcheck.setTestList(inputs.healthcheck.test);
    service.setHealthcheck(healthcheck);
  }
  if (inputs.domainname) {
    service.setDomainname(inputs.domainname);
  }
  return service;
}

function dummyServiceInfo(service: pb.Service): pb.ServiceInfo {
  const info = new pb.ServiceInfo();
  info.setService(service);
  return info;
}

async function uploadBuildContext(
  client: fabric.FabricControllerClient,
  context: string
): Promise<string> {
  const uploadUrlResponse = await new Promise<pb.UploadURLResponse>(
    (resolve, reject) =>
      client.createUploadURL(new pb.UploadURLRequest(), (err, res) =>
        err ? reject(err) : resolve(res!)
      )
  );
  const putUrl = uploadUrlResponse.getUrl();
  if (debug) console.debug(`Uploading build context to ${putUrl}`);
  await uploadTarball(putUrl, context);
  return putUrl.replace(/\?.*$/, ""); // remove query params
}

async function updatex(
  inputs: DefangServiceInputs,
  force: boolean = false
): Promise<pb.ServiceInfo> {
  const service = convertServiceInputs(inputs);
  const client = await connect(inputs.fabricDNS);
  try {
    // Upload the build context, if provided
    if (inputs.build?.context) {
      const build = new pb.Build();
      build.setContext(await uploadBuildContext(client, inputs.build.context));
      if (inputs.build.dockerfile) {
        build.setDockerfile(inputs.build.dockerfile);
      }
      if (inputs.build.args) {
        for (const [key, value] of Object.entries(inputs.build.args)) {
          build.getArgsMap().set(key, value);
        }
      }
      service.setBuild(build);
    }

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
            err ? reject(err) : resolve(res!)
          )
        );
      }) ?? []
    );

    return await new Promise<pb.ServiceInfo>((resolve, reject) =>
      client.update(service, (err, res) => (err ? reject(err) : resolve(res!)))
    );
  } catch (err) {
    if (!force) throw err;
    console.warn(`Forced update; ignoring error: ${err}`);
    return dummyServiceInfo(service);
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

interface DefangServiceInputs {
  fabricDNS: string;
  name: string;
  image?: string;
  platform?: Platform;
  internal?: boolean;
  deploy?: Deploy;
  ports?: Port[];
  environment?: { [key: string]: string };
  secrets?: pulumi.Unwrap<Secret>[];
  build?: pulumi.Unwrap<Build>;
  forceNewDeployment?: boolean;
  command?: string[];
  healthcheck?: HealthCheck;
  domainname?: string;
}

interface DefangServiceOutputs {
  endpoints: string[];
  etag: string;
  fabricDNS: string;
  lbIPs: string[];
  natIPs: string[];
  privateFqdn?: string;
  publicFqdn?: string;
  service: pb.Service.AsObject; // this might contain undefined, which is not allowed
  // status: string;
  // tenant: string;
}

function unempty(s: string): string | undefined {
  return s || undefined;
}

function toOutputs(
  fabricDNS: string,
  service: pb.ServiceInfo,
  old?: DefangServiceOutputs
): DefangServiceOutputs {
  // FIXME: the fallbacks of `?? old?.` here don't work since the lhs is never undefined
  return deleteUndefined({
    endpoints: service.getEndpointsList() ?? old?.endpoints,
    etag: service.getEtag() ?? old?.etag,
    fabricDNS,
    lbIPs: service.getLbIpsList() ?? old?.lbIPs,
    natIPs: service.getNatIpsList() ?? old?.natIPs,
    privateFqdn: unempty(service.getPrivateFqdn() ?? old?.privateFqdn), // can be empty string
    publicFqdn: unempty(service.getPublicFqdn() ?? old?.publicFqdn), // can be empty string
    service: service.getService()!.toObject(),
  });
}

function isValidReservation(x?: number): boolean {
  return x === undefined || x > 0; // returns false for NaN
}

const defangServiceProvider: pulumi.dynamic.ResourceProvider = {
  async check(
    olds: DefangServiceInputs,
    news: DefangServiceInputs
  ): Promise<pulumi.dynamic.CheckResult<DefangServiceInputs>> {
    const failures: pulumi.dynamic.CheckFailure[] = [];

    if (!news.fabricDNS) {
      failures.push({ property: "fabricDNS", reason: "fabricDNS is required" });
    }
    // TODO: validate name
    if (!news.name) {
      failures.push({ property: "name", reason: "name is required" });
    }
    if (news.deploy) {
      if (!isValidUint(news.deploy.replicas ?? 0)) {
        failures.push(
            {
              property: "deploy",
              reason: "replicas must be an integer ≥ 0",
            },
          );
      }
      if (!isValidReservation(news.deploy.resources?.reservations?.cpu)) {
        failures.push(
            {
              property: "deploy",
              reason: "cpu reservation must be > 0",
            },
          );
      }
      if (!isValidReservation(news.deploy.resources?.reservations?.memory)) {
        failures.push(
            {
              property: "deploy",
              reason: "memory reservation must be > 0",
            },
          );
      }
    }
    for (const port of news.ports || []) {
      // port.protocol = port.protocol || "tcp"; TODO: should we set defaults here?
      if (
        port.target < 1 ||
        port.target > 32767 ||
        !Number.isInteger(port.target)
      ) {
        failures.push(
            {
              property: "ports",
              reason: "target port must be an integer between 1 and 32767",
            },
          );
      }
      if (port.mode === "ingress") {
        if (["udp", "tcp"].includes(port.protocol!)) {
          failures.push(
              {
                property: "ports",
                reason: "ingress is not support by protocol " + port.protocol,
              },
            );
        }
        if (!news.healthcheck?.test) {
          console.warn(
            "ingress port without healthcheck defaults to GET / HTTP/1.1"
          );
        }
      }
    }
    for (const secret of news.secrets || []) {
      // TODO: validate source name
      if (!secret.source) {
        failures.push(
            {
              property: "secrets",
              reason: "secret source is required",
            },
          );
      }
    }
    if (news.build) {
      if (!news.build.context) {
        failures.push(
            {
              property: "build",
              reason: "build context is required",
            },
          );
      }
      if (news.build.dockerfile === "") {
        failures.push(
            {
              property: "build",
              reason: "dockerfile cannot be empty string",
            },
          );
      }
      if (news.image) {
        failures.push(
            {
              property: "image",
              reason: "cannot specify both build and image",
            },
          );
      }
    } else if (!news.image) {
      failures.push({ property: "image", reason: "image is required" });
    }
    return { inputs: news, failures };
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
    const serviceIds = new pb.DeleteRequest();
    serviceIds.addNames(id);
    const client = await connect(olds.fabricDNS);
    try {
      await new Promise<Empty>((resolve, reject) =>
        client.delete(serviceIds, (err, res) =>
          err ? reject(err) : resolve(res!)
        )
      );
    } catch (err) {
      // Ignore "not found" errors
      if ((err as grpc.ServiceError).code !== grpc.status.NOT_FOUND) {
        throw err;
      }
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
      outs: toOutputs(news.fabricDNS, result, olds),
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
  /** number of vCPUs to reserve */
  cpu?: number;
  /** number of MiB to reserve */
  memory?: number;
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
  /** the name of the secret to expose as an environment variable */
  source: pulumi.Input<string>;
  /** optional value of the secret; alternatively, the secret can be set via the Defang CLI */
  value?: pulumi.Input<string>;
}

export interface HealthCheck {
  /** optional health check test */
  test: ["CMD", "curl", HttpUrl]; // TODO: support NONE and curl flags
}

export interface Build {
  /** the folder to send to the builder */
  context: string;
  /** the path to the Dockerfile; defaults to Dockerfile */
  dockerfile?: string;
  /** the build args to pass to the builder */
  args?: pulumi.Input<{ [key: string]: pulumi.Input<string> }>;
}

export interface DefangServiceArgs {
  /** the DNS name of the Defang Fabric service; defaults to the value of the DEFANG_FABRIC or prod, if unset */
  fabricDNS?: pulumi.Input<string>;
  /** the name of the service; defaults to the name of the resource */
  name?: pulumi.Input<string>;
  /** the container image to deploy; required when no build configuration was provided */
  image?: pulumi.Input<string>;
  /** the platform to deploy to; defaults to "linux/amd64" */
  platform?: pulumi.Input<Platform>;
  /** whether the service requires a public IP or not; defaults to true */
  internal?: pulumi.Input<boolean>;
  /** the optional deployment configuration */
  deploy?: pulumi.Input<Deploy>;
  /** the ports to expose */
  ports?: pulumi.Input<pulumi.Input<Port>[]>;
  /** the environment variables to set */
  environment?: pulumi.Input<{ [key: string]: pulumi.Input<string> }>;
  /** the secrets to expose as environment variables */
  secrets?: pulumi.Input<pulumi.Input<Secret>[]>;
  /** force deployment of the service even if nothing has changed */
  forceNewDeployment?: pulumi.Input<boolean>;
  /** the command to run; overrides the container image's CMD */
  command?: pulumi.Input<pulumi.Input<string>[]>;
  /** the optional build configuration; required when no image was provided */
  build?: pulumi.Input<Build>;
  /** the optional health-check test for the service */
  healthcheck?: pulumi.Input<HealthCheck>;
  /** the optional fully qualified domain name for the service; requires CNAME to the publicFqdn */
  domainname?: pulumi.Input<string>;
}

/**
 * A Pulumi custom resource for managing a service on Defang.
 */
export class DefangService extends pulumi.dynamic.Resource {
  /** the name of the service resource */
  public readonly name!: pulumi.Output<string>;
  /** the DNS name of the Defang Fabric service */
  public readonly fabricDNS!: pulumi.Output<string>;
  /** the fully qualified endpoint(s) of the service, one for each port */
  public readonly endpoints!: pulumi.Output<string[]>;
  /** the public NAT IPs of the service; useful for allow-lists */
  public readonly natIPs!: pulumi.Output<string[]>;
  /** the "etag" or deployment ID for the update; useful for tail */
  public readonly etag!: pulumi.Output<string>;
  /** the private load balancer IPs; useful for allow-lists */
  public readonly lbIPs!: pulumi.Output<string[]>;
  /** the private fully qualified domain name of the service; only for services with host ports */
  public readonly privateFqdn!: pulumi.Output<string | undefined>;
  /** the public fully qualified domain name of the service; only for services with ingress ports */
  public readonly publicFqdn!: pulumi.Output<string | undefined>;

  /**
   * Declare a new service on Defang.
   * @constructor
   * @param name the name of the resource
   * @param args the arguments to configure the service
   * @param opts the Pulumi resource options
   */
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
    super(
      defangServiceProvider,
      name,
      {
        endpoints: undefined,
        etag: undefined,
        lbIPs: undefined,
        natIPs: undefined,
        privateFqdn: undefined,
        publicFqdn: undefined,
        ...args,
      },
      opts
    );
  }
}
