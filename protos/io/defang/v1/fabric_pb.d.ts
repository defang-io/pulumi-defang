// package: io.defang.v1
// file: io/defang/v1/fabric.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class DeleteRequest extends jspb.Message {
  clearNamesList(): void;
  getNamesList(): Array<string>;
  setNamesList(value: Array<string>): void;
  addNames(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteRequest): DeleteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteRequest;
  static deserializeBinaryFromReader(message: DeleteRequest, reader: jspb.BinaryReader): DeleteRequest;
}

export namespace DeleteRequest {
  export type AsObject = {
    namesList: Array<string>,
  }
}

export class DeleteResponse extends jspb.Message {
  getEtag(): string;
  setEtag(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteResponse): DeleteResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteResponse;
  static deserializeBinaryFromReader(message: DeleteResponse, reader: jspb.BinaryReader): DeleteResponse;
}

export namespace DeleteResponse {
  export type AsObject = {
    etag: string,
  }
}

export class GenerateFilesRequest extends jspb.Message {
  getPrompt(): string;
  setPrompt(value: string): void;

  getLanguage(): string;
  setLanguage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenerateFilesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GenerateFilesRequest): GenerateFilesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GenerateFilesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenerateFilesRequest;
  static deserializeBinaryFromReader(message: GenerateFilesRequest, reader: jspb.BinaryReader): GenerateFilesRequest;
}

export namespace GenerateFilesRequest {
  export type AsObject = {
    prompt: string,
    language: string,
  }
}

export class File extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): File.AsObject;
  static toObject(includeInstance: boolean, msg: File): File.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: File, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): File;
  static deserializeBinaryFromReader(message: File, reader: jspb.BinaryReader): File;
}

export namespace File {
  export type AsObject = {
    name: string,
    content: string,
  }
}

export class GenerateFilesResponse extends jspb.Message {
  clearFilesList(): void;
  getFilesList(): Array<File>;
  setFilesList(value: Array<File>): void;
  addFiles(value?: File, index?: number): File;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenerateFilesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GenerateFilesResponse): GenerateFilesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GenerateFilesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenerateFilesResponse;
  static deserializeBinaryFromReader(message: GenerateFilesResponse, reader: jspb.BinaryReader): GenerateFilesResponse;
}

export namespace GenerateFilesResponse {
  export type AsObject = {
    filesList: Array<File.AsObject>,
  }
}

export class UploadURLResponse extends jspb.Message {
  getUrl(): string;
  setUrl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadURLResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UploadURLResponse): UploadURLResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UploadURLResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadURLResponse;
  static deserializeBinaryFromReader(message: UploadURLResponse, reader: jspb.BinaryReader): UploadURLResponse;
}

export namespace UploadURLResponse {
  export type AsObject = {
    url: string,
  }
}

export class ServiceInfo extends jspb.Message {
  hasService(): boolean;
  clearService(): void;
  getService(): Service | undefined;
  setService(value?: Service): void;

  clearEndpointsList(): void;
  getEndpointsList(): Array<string>;
  setEndpointsList(value: Array<string>): void;
  addEndpoints(value: string, index?: number): string;

  getTenant(): string;
  setTenant(value: string): void;

  getEtag(): string;
  setEtag(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  clearNatIpsList(): void;
  getNatIpsList(): Array<string>;
  setNatIpsList(value: Array<string>): void;
  addNatIps(value: string, index?: number): string;

  clearLbIpsList(): void;
  getLbIpsList(): Array<string>;
  setLbIpsList(value: Array<string>): void;
  addLbIps(value: string, index?: number): string;

  getPrivateFqdn(): string;
  setPrivateFqdn(value: string): void;

  getPublicFqdn(): string;
  setPublicFqdn(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServiceInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ServiceInfo): ServiceInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ServiceInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServiceInfo;
  static deserializeBinaryFromReader(message: ServiceInfo, reader: jspb.BinaryReader): ServiceInfo;
}

export namespace ServiceInfo {
  export type AsObject = {
    service?: Service.AsObject,
    endpointsList: Array<string>,
    tenant: string,
    etag: string,
    status: string,
    natIpsList: Array<string>,
    lbIpsList: Array<string>,
    privateFqdn: string,
    publicFqdn: string,
  }
}

export class Secrets extends jspb.Message {
  clearNamesList(): void;
  getNamesList(): Array<string>;
  setNamesList(value: Array<string>): void;
  addNames(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Secrets.AsObject;
  static toObject(includeInstance: boolean, msg: Secrets): Secrets.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Secrets, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Secrets;
  static deserializeBinaryFromReader(message: Secrets, reader: jspb.BinaryReader): Secrets;
}

export namespace Secrets {
  export type AsObject = {
    namesList: Array<string>,
  }
}

export class SecretValue extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SecretValue.AsObject;
  static toObject(includeInstance: boolean, msg: SecretValue): SecretValue.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SecretValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SecretValue;
  static deserializeBinaryFromReader(message: SecretValue, reader: jspb.BinaryReader): SecretValue;
}

export namespace SecretValue {
  export type AsObject = {
    name: string,
    value: string,
  }
}

export class TokenRequest extends jspb.Message {
  getTenant(): string;
  setTenant(value: string): void;

  getAuthCode(): string;
  setAuthCode(value: string): void;

  clearScopeList(): void;
  getScopeList(): Array<string>;
  setScopeList(value: Array<string>): void;
  addScope(value: string, index?: number): string;

  getAssertion(): string;
  setAssertion(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TokenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TokenRequest): TokenRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TokenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TokenRequest;
  static deserializeBinaryFromReader(message: TokenRequest, reader: jspb.BinaryReader): TokenRequest;
}

export namespace TokenRequest {
  export type AsObject = {
    tenant: string,
    authCode: string,
    scopeList: Array<string>,
    assertion: string,
  }
}

export class TokenResponse extends jspb.Message {
  getAccessToken(): string;
  setAccessToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TokenResponse): TokenResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TokenResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TokenResponse;
  static deserializeBinaryFromReader(message: TokenResponse, reader: jspb.BinaryReader): TokenResponse;
}

export namespace TokenResponse {
  export type AsObject = {
    accessToken: string,
  }
}

export class Status extends jspb.Message {
  getVersion(): string;
  setVersion(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Status.AsObject;
  static toObject(includeInstance: boolean, msg: Status): Status.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Status, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Status;
  static deserializeBinaryFromReader(message: Status, reader: jspb.BinaryReader): Status;
}

export namespace Status {
  export type AsObject = {
    version: string,
  }
}

export class Version extends jspb.Message {
  getFabric(): string;
  setFabric(value: string): void;

  getNats(): string;
  setNats(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Version.AsObject;
  static toObject(includeInstance: boolean, msg: Version): Version.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Version, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Version;
  static deserializeBinaryFromReader(message: Version, reader: jspb.BinaryReader): Version;
}

export namespace Version {
  export type AsObject = {
    fabric: string,
    nats: string,
  }
}

export class TailRequest extends jspb.Message {
  getService(): string;
  setService(value: string): void;

  hasSince(): boolean;
  clearSince(): void;
  getSince(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setSince(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getEtag(): string;
  setEtag(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TailRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TailRequest): TailRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TailRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TailRequest;
  static deserializeBinaryFromReader(message: TailRequest, reader: jspb.BinaryReader): TailRequest;
}

export namespace TailRequest {
  export type AsObject = {
    service: string,
    since?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    etag: string,
  }
}

export class LogEntry extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  hasTimestamp(): boolean;
  clearTimestamp(): void;
  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getStderr(): boolean;
  setStderr(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LogEntry.AsObject;
  static toObject(includeInstance: boolean, msg: LogEntry): LogEntry.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LogEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LogEntry;
  static deserializeBinaryFromReader(message: LogEntry, reader: jspb.BinaryReader): LogEntry;
}

export namespace LogEntry {
  export type AsObject = {
    message: string,
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    stderr: boolean,
  }
}

export class TailResponse extends jspb.Message {
  clearEntriesList(): void;
  getEntriesList(): Array<LogEntry>;
  setEntriesList(value: Array<LogEntry>): void;
  addEntries(value?: LogEntry, index?: number): LogEntry;

  getService(): string;
  setService(value: string): void;

  getEtag(): string;
  setEtag(value: string): void;

  getHost(): string;
  setHost(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TailResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TailResponse): TailResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TailResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TailResponse;
  static deserializeBinaryFromReader(message: TailResponse, reader: jspb.BinaryReader): TailResponse;
}

export namespace TailResponse {
  export type AsObject = {
    entriesList: Array<LogEntry.AsObject>,
    service: string,
    etag: string,
    host: string,
  }
}

export class ListServicesResponse extends jspb.Message {
  clearServicesList(): void;
  getServicesList(): Array<ServiceInfo>;
  setServicesList(value: Array<ServiceInfo>): void;
  addServices(value?: ServiceInfo, index?: number): ServiceInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListServicesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListServicesResponse): ListServicesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListServicesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListServicesResponse;
  static deserializeBinaryFromReader(message: ListServicesResponse, reader: jspb.BinaryReader): ListServicesResponse;
}

export namespace ListServicesResponse {
  export type AsObject = {
    servicesList: Array<ServiceInfo.AsObject>,
  }
}

export class ServiceID extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServiceID.AsObject;
  static toObject(includeInstance: boolean, msg: ServiceID): ServiceID.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ServiceID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServiceID;
  static deserializeBinaryFromReader(message: ServiceID, reader: jspb.BinaryReader): ServiceID;
}

export namespace ServiceID {
  export type AsObject = {
    name: string,
  }
}

export class Device extends jspb.Message {
  clearCapabilitiesList(): void;
  getCapabilitiesList(): Array<string>;
  setCapabilitiesList(value: Array<string>): void;
  addCapabilities(value: string, index?: number): string;

  getDriver(): string;
  setDriver(value: string): void;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Device.AsObject;
  static toObject(includeInstance: boolean, msg: Device): Device.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Device, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Device;
  static deserializeBinaryFromReader(message: Device, reader: jspb.BinaryReader): Device;
}

export namespace Device {
  export type AsObject = {
    capabilitiesList: Array<string>,
    driver: string,
    count: number,
  }
}

export class Resource extends jspb.Message {
  getMemory(): number;
  setMemory(value: number): void;

  getCpus(): number;
  setCpus(value: number): void;

  clearDevicesList(): void;
  getDevicesList(): Array<Device>;
  setDevicesList(value: Array<Device>): void;
  addDevices(value?: Device, index?: number): Device;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Resource.AsObject;
  static toObject(includeInstance: boolean, msg: Resource): Resource.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Resource, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Resource;
  static deserializeBinaryFromReader(message: Resource, reader: jspb.BinaryReader): Resource;
}

export namespace Resource {
  export type AsObject = {
    memory: number,
    cpus: number,
    devicesList: Array<Device.AsObject>,
  }
}

export class Resources extends jspb.Message {
  hasReservations(): boolean;
  clearReservations(): void;
  getReservations(): Resource | undefined;
  setReservations(value?: Resource): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Resources.AsObject;
  static toObject(includeInstance: boolean, msg: Resources): Resources.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Resources, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Resources;
  static deserializeBinaryFromReader(message: Resources, reader: jspb.BinaryReader): Resources;
}

export namespace Resources {
  export type AsObject = {
    reservations?: Resource.AsObject,
  }
}

export class Deploy extends jspb.Message {
  getReplicas(): number;
  setReplicas(value: number): void;

  hasResources(): boolean;
  clearResources(): void;
  getResources(): Resources | undefined;
  setResources(value?: Resources): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Deploy.AsObject;
  static toObject(includeInstance: boolean, msg: Deploy): Deploy.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Deploy, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Deploy;
  static deserializeBinaryFromReader(message: Deploy, reader: jspb.BinaryReader): Deploy;
}

export namespace Deploy {
  export type AsObject = {
    replicas: number,
    resources?: Resources.AsObject,
  }
}

export class Port extends jspb.Message {
  getTarget(): number;
  setTarget(value: number): void;

  getProtocol(): ProtocolMap[keyof ProtocolMap];
  setProtocol(value: ProtocolMap[keyof ProtocolMap]): void;

  getMode(): ModeMap[keyof ModeMap];
  setMode(value: ModeMap[keyof ModeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Port.AsObject;
  static toObject(includeInstance: boolean, msg: Port): Port.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Port, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Port;
  static deserializeBinaryFromReader(message: Port, reader: jspb.BinaryReader): Port;
}

export namespace Port {
  export type AsObject = {
    target: number,
    protocol: ProtocolMap[keyof ProtocolMap],
    mode: ModeMap[keyof ModeMap],
  }
}

export class Secret extends jspb.Message {
  getSource(): string;
  setSource(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Secret.AsObject;
  static toObject(includeInstance: boolean, msg: Secret): Secret.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Secret, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Secret;
  static deserializeBinaryFromReader(message: Secret, reader: jspb.BinaryReader): Secret;
}

export namespace Secret {
  export type AsObject = {
    source: string,
  }
}

export class Build extends jspb.Message {
  getContext(): string;
  setContext(value: string): void;

  getDockerfile(): string;
  setDockerfile(value: string): void;

  getArgsMap(): jspb.Map<string, string>;
  clearArgsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Build.AsObject;
  static toObject(includeInstance: boolean, msg: Build): Build.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Build, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Build;
  static deserializeBinaryFromReader(message: Build, reader: jspb.BinaryReader): Build;
}

export namespace Build {
  export type AsObject = {
    context: string,
    dockerfile: string,
    argsMap: Array<[string, string]>,
  }
}

export class HealthCheck extends jspb.Message {
  clearTestList(): void;
  getTestList(): Array<string>;
  setTestList(value: Array<string>): void;
  addTest(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HealthCheck.AsObject;
  static toObject(includeInstance: boolean, msg: HealthCheck): HealthCheck.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HealthCheck, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HealthCheck;
  static deserializeBinaryFromReader(message: HealthCheck, reader: jspb.BinaryReader): HealthCheck;
}

export namespace HealthCheck {
  export type AsObject = {
    testList: Array<string>,
  }
}

export class Service extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getImage(): string;
  setImage(value: string): void;

  getPlatform(): PlatformMap[keyof PlatformMap];
  setPlatform(value: PlatformMap[keyof PlatformMap]): void;

  getInternal(): boolean;
  setInternal(value: boolean): void;

  hasDeploy(): boolean;
  clearDeploy(): void;
  getDeploy(): Deploy | undefined;
  setDeploy(value?: Deploy): void;

  clearPortsList(): void;
  getPortsList(): Array<Port>;
  setPortsList(value: Array<Port>): void;
  addPorts(value?: Port, index?: number): Port;

  getEnvironmentMap(): jspb.Map<string, string>;
  clearEnvironmentMap(): void;
  hasBuild(): boolean;
  clearBuild(): void;
  getBuild(): Build | undefined;
  setBuild(value?: Build): void;

  clearSecretsList(): void;
  getSecretsList(): Array<Secret>;
  setSecretsList(value: Array<Secret>): void;
  addSecrets(value?: Secret, index?: number): Secret;

  hasHealthcheck(): boolean;
  clearHealthcheck(): void;
  getHealthcheck(): HealthCheck | undefined;
  setHealthcheck(value?: HealthCheck): void;

  clearCommandList(): void;
  getCommandList(): Array<string>;
  setCommandList(value: Array<string>): void;
  addCommand(value: string, index?: number): string;

  getDomainname(): string;
  setDomainname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Service.AsObject;
  static toObject(includeInstance: boolean, msg: Service): Service.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Service, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Service;
  static deserializeBinaryFromReader(message: Service, reader: jspb.BinaryReader): Service;
}

export namespace Service {
  export type AsObject = {
    name: string,
    image: string,
    platform: PlatformMap[keyof PlatformMap],
    internal: boolean,
    deploy?: Deploy.AsObject,
    portsList: Array<Port.AsObject>,
    environmentMap: Array<[string, string]>,
    build?: Build.AsObject,
    secretsList: Array<Secret.AsObject>,
    healthcheck?: HealthCheck.AsObject,
    commandList: Array<string>,
    domainname: string,
  }
}

export class Event extends jspb.Message {
  getSpecversion(): string;
  setSpecversion(value: string): void;

  getType(): string;
  setType(value: string): void;

  getSource(): string;
  setSource(value: string): void;

  getId(): string;
  setId(value: string): void;

  getDatacontenttype(): string;
  setDatacontenttype(value: string): void;

  getDataschema(): string;
  setDataschema(value: string): void;

  getSubject(): string;
  setSubject(value: string): void;

  hasTime(): boolean;
  clearTime(): void;
  getTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTime(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Event.AsObject;
  static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Event;
  static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
  export type AsObject = {
    specversion: string,
    type: string,
    source: string,
    id: string,
    datacontenttype: string,
    dataschema: string,
    subject: string,
    time?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    data: Uint8Array | string,
  }
}

export class PublishRequest extends jspb.Message {
  hasEvent(): boolean;
  clearEvent(): void;
  getEvent(): Event | undefined;
  setEvent(value?: Event): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PublishRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PublishRequest): PublishRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PublishRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PublishRequest;
  static deserializeBinaryFromReader(message: PublishRequest, reader: jspb.BinaryReader): PublishRequest;
}

export namespace PublishRequest {
  export type AsObject = {
    event?: Event.AsObject,
  }
}

export class SubscribeRequest extends jspb.Message {
  getService(): string;
  setService(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscribeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SubscribeRequest): SubscribeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubscribeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscribeRequest;
  static deserializeBinaryFromReader(message: SubscribeRequest, reader: jspb.BinaryReader): SubscribeRequest;
}

export namespace SubscribeRequest {
  export type AsObject = {
    service: string,
  }
}

export class SubscribeResponse extends jspb.Message {
  clearServicesList(): void;
  getServicesList(): Array<ServiceInfo>;
  setServicesList(value: Array<ServiceInfo>): void;
  addServices(value?: ServiceInfo, index?: number): ServiceInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscribeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SubscribeResponse): SubscribeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubscribeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscribeResponse;
  static deserializeBinaryFromReader(message: SubscribeResponse, reader: jspb.BinaryReader): SubscribeResponse;
}

export namespace SubscribeResponse {
  export type AsObject = {
    servicesList: Array<ServiceInfo.AsObject>,
  }
}

export interface PlatformMap {
  LINUX_AMD64: 0;
  LINUX_ARM64: 1;
  LINUX_ANY: 2;
}

export const Platform: PlatformMap;

export interface ProtocolMap {
  ANY: 0;
  UDP: 1;
  TCP: 2;
  HTTP: 3;
  HTTP2: 4;
  GRPC: 5;
}

export const Protocol: ProtocolMap;

export interface ModeMap {
  HOST: 0;
  INGRESS: 1;
}

export const Mode: ModeMap;

