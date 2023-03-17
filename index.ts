import * as pulumi from "@pulumi/pulumi";
import * as grpc from "@grpc/grpc-js";
import assert = require("assert");

import * as fabric from "./protos/v1/fabric_grpc_pb";
import * as pb from "./protos/v1/fabric_pb";
import { deleteUndefined, isEqual, optionals } from "./utils";

let accessToken = process.env["DEFANG_ACCESS_TOKEN"];

export function setAccessToken(token: string) {
  accessToken = token;
}

// Connect to our gRPC server
async function connect(
  fabricDNS: string
): Promise<fabric.FabricControllerClient> {
  const client = new fabric.FabricControllerClient(
    fabricDNS + ":443",
    grpc.credentials.combineChannelCredentials(
      grpc.credentials.createSsl(),
      grpc.credentials.createFromMetadataGenerator((_, callback) => {
        const metadata = new grpc.Metadata();
        // TODO: automatically generate a new token once it expires
        metadata.set("authorization", "Bearer " + accessToken!);
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
    const resources = new pb.Resources();
    resources.setReservations(reservations);
    deploy.setResources(resources);
  }
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
  return service;
}

async function updatex(inputs: DefangServiceInputs): Promise<pb.Service> {
  const service = convertServiceInputs(inputs);
  const client = await connect(inputs.fabricDNS);
  const result = await new Promise<pb.Service>((resolve, reject) =>
    client.update(service, (err, res) => (err ? reject(err) : resolve(res!)))
  );
  assert(result);
  return result;
}

function convertPorts(ports: Port[] = []): pb.Port[] {
  return ports.map((p) => {
    const port = new pb.Port();
    port.setTarget(p.target);
    port.setProtocol(p.protocol === "udp" ? pb.Protocol.UDP : pb.Protocol.TCP);
    return port;
  });
}

interface DefangServiceInputs {
  fabricDNS: string;
  name: string;
  image: string;
  platform?: Platform;
  // internal?: boolean;
  deploy?: Deploy;
  ports?: Port[];
  environment?: { [key: string]: string };
  // build?: string;
}

interface DefangServiceOutputs {
  fabricDNS: string;
  service: pb.Service.AsObject; // this might contain undefined, which is not allowed
  fqdn: string;
}

function toOutputs(
  fabricDNS: string,
  service: pb.Service
): DefangServiceOutputs {
  return {
    fabricDNS,
    service: deleteUndefined(service.toObject()),
    fqdn: fabricDNS.replace(/^fabric-/, service.getName() + "."), // FIXME: fabric should return this
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
    }
    return { inputs: news };
  },
  async create(
    inputs: DefangServiceInputs
  ): Promise<pulumi.dynamic.CreateResult<DefangServiceOutputs>> {
    const result = await updatex(inputs);
    return {
      id: result.getName(), // TODO: do we need to return a unique ID?
      outs: toOutputs(inputs.fabricDNS, result),
    };
  },
  async delete(id: string, olds: DefangServiceOutputs) {
    const client = await connect(olds.fabricDNS);
    const service = new pb.ServiceID();
    service.setName(id);
    await new Promise<pb.Void>((resolve, reject) =>
      client.delete(service, (err, res) => (err ? reject(err) : resolve(res!)))
    );
  },
  async diff(
    id: string,
    oldOutputs: DefangServiceOutputs,
    newInputs: DefangServiceInputs
  ): Promise<pulumi.dynamic.DiffResult> {
    assert.equal(id, oldOutputs.service.name);
    return {
      changes: !isEqual(
        oldOutputs.service,
        convertServiceInputs(newInputs).toObject()
      ),
      replaces: [
        ...optionals(oldOutputs.service.name !== newInputs.name, "name"),
        ...optionals(oldOutputs.fabricDNS !== newInputs.fabricDNS, "fabricDNS"),
      ],
      // deleteBeforeReplace: true,
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
    const result = await updatex(news);
    assert.strictEqual(result.getName(), id);
    return {
      outs: toOutputs(news.fabricDNS, result),
    };
  },
  async read(
    id: string,
    olds: DefangServiceOutputs
  ): Promise<pulumi.dynamic.ReadResult<DefangServiceOutputs>> {
    const client = await connect(olds.fabricDNS);
    const result = await new Promise<pb.Service>((resolve, reject) => {
      const serviceId = new pb.ServiceID();
      serviceId.setName(id);
      return client.get(serviceId, (err, res) =>
        err ? reject(err) : resolve(res!)
      );
    });
    return {
      id,
      props: toOutputs(olds.fabricDNS, result),
    };
  },
};

export type Platform = "linux/arm64" | "linux/amd64" | "linux";

export interface Port {
  target: number;
  protocol?: "tcp" | "udp";
}

export interface Resource {
  cpu?: number;
  memory?: number;
  // devices?: Device[];
}

export interface Deploy {
  replicas?: number;
  resources?: {
    reservations?: Resource;
    // limits?: Resource;
  };
}

export interface DefangServiceArgs {
  fabricDNS?: pulumi.Input<string>;
  name?: pulumi.Input<string>;
  image: pulumi.Input<string>;
  platform?: pulumi.Input<Platform>;
  // internal?: pulumi.Input<boolean>;
  deploy?: pulumi.Input<Deploy>;
  ports?: pulumi.Input<pulumi.Input<Port>[]>;
  environment?: pulumi.Input<{ [key: string]: pulumi.Input<string> }>;
  // build?: pulumi.Input<string>;
}

export class DefangService extends pulumi.dynamic.Resource {
  public readonly fabricDNS!: pulumi.Output<string>;
  public readonly fqdn!: pulumi.Output<string>;
  public readonly name!: pulumi.Output<string>;

  constructor(
    name: string,
    args: DefangServiceArgs,
    opts?: pulumi.CustomResourceOptions
  ) {
    if (!args.name) {
      args.name = name;
    }
    if (!args.fabricDNS) {
      args.fabricDNS = "fabric-dev.gnafed.click";
    }
    super(defangServiceProvider, name, { fqdn: undefined, ...args }, opts);
  }
}
