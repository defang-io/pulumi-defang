// GENERATED CODE -- DO NOT EDIT!

// package: io.defang.v1
// file: io/defang/v1/fabric.proto

import * as io_defang_v1_fabric_pb from "../../../io/defang/v1/fabric_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as grpc from "@grpc/grpc-js";

interface IFabricControllerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getStatus: grpc.MethodDefinition<google_protobuf_empty_pb.Empty, io_defang_v1_fabric_pb.Status>;
  getVersion: grpc.MethodDefinition<google_protobuf_empty_pb.Empty, io_defang_v1_fabric_pb.Version>;
  tail: grpc.MethodDefinition<io_defang_v1_fabric_pb.ServiceID, io_defang_v1_fabric_pb.LogEntry>;
  update: grpc.MethodDefinition<io_defang_v1_fabric_pb.Service, io_defang_v1_fabric_pb.ServiceInfo>;
  get: grpc.MethodDefinition<io_defang_v1_fabric_pb.ServiceID, io_defang_v1_fabric_pb.ServiceInfo>;
  delete: grpc.MethodDefinition<io_defang_v1_fabric_pb.ServiceID, google_protobuf_empty_pb.Empty>;
  publish: grpc.MethodDefinition<io_defang_v1_fabric_pb.Event, google_protobuf_empty_pb.Empty>;
  getServices: grpc.MethodDefinition<google_protobuf_empty_pb.Empty, io_defang_v1_fabric_pb.Services>;
  generateToken: grpc.MethodDefinition<io_defang_v1_fabric_pb.Auth, io_defang_v1_fabric_pb.Token>;
  generateFiles: grpc.MethodDefinition<io_defang_v1_fabric_pb.GenerateFilesRequest, io_defang_v1_fabric_pb.GenerateFilesResponse>;
  putSecret: grpc.MethodDefinition<io_defang_v1_fabric_pb.SecretValue, google_protobuf_empty_pb.Empty>;
  listSecrets: grpc.MethodDefinition<google_protobuf_empty_pb.Empty, io_defang_v1_fabric_pb.Secrets>;
  createUploadURL: grpc.MethodDefinition<google_protobuf_empty_pb.Empty, io_defang_v1_fabric_pb.UploadURLResponse>;
}

export const FabricControllerService: IFabricControllerService;

export interface IFabricControllerServer extends grpc.UntypedServiceImplementation {
  getStatus: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, io_defang_v1_fabric_pb.Status>;
  getVersion: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, io_defang_v1_fabric_pb.Version>;
  tail: grpc.handleServerStreamingCall<io_defang_v1_fabric_pb.ServiceID, io_defang_v1_fabric_pb.LogEntry>;
  update: grpc.handleUnaryCall<io_defang_v1_fabric_pb.Service, io_defang_v1_fabric_pb.ServiceInfo>;
  get: grpc.handleUnaryCall<io_defang_v1_fabric_pb.ServiceID, io_defang_v1_fabric_pb.ServiceInfo>;
  delete: grpc.handleUnaryCall<io_defang_v1_fabric_pb.ServiceID, google_protobuf_empty_pb.Empty>;
  publish: grpc.handleUnaryCall<io_defang_v1_fabric_pb.Event, google_protobuf_empty_pb.Empty>;
  getServices: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, io_defang_v1_fabric_pb.Services>;
  generateToken: grpc.handleUnaryCall<io_defang_v1_fabric_pb.Auth, io_defang_v1_fabric_pb.Token>;
  generateFiles: grpc.handleUnaryCall<io_defang_v1_fabric_pb.GenerateFilesRequest, io_defang_v1_fabric_pb.GenerateFilesResponse>;
  putSecret: grpc.handleUnaryCall<io_defang_v1_fabric_pb.SecretValue, google_protobuf_empty_pb.Empty>;
  listSecrets: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, io_defang_v1_fabric_pb.Secrets>;
  createUploadURL: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, io_defang_v1_fabric_pb.UploadURLResponse>;
}

export class FabricControllerClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getStatus(argument: google_protobuf_empty_pb.Empty, callback: grpc.requestCallback<io_defang_v1_fabric_pb.Status>): grpc.ClientUnaryCall;
  getStatus(argument: google_protobuf_empty_pb.Empty, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.Status>): grpc.ClientUnaryCall;
  getStatus(argument: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.Status>): grpc.ClientUnaryCall;
  getVersion(argument: google_protobuf_empty_pb.Empty, callback: grpc.requestCallback<io_defang_v1_fabric_pb.Version>): grpc.ClientUnaryCall;
  getVersion(argument: google_protobuf_empty_pb.Empty, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.Version>): grpc.ClientUnaryCall;
  getVersion(argument: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.Version>): grpc.ClientUnaryCall;
  tail(argument: io_defang_v1_fabric_pb.ServiceID, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<io_defang_v1_fabric_pb.LogEntry>;
  tail(argument: io_defang_v1_fabric_pb.ServiceID, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<io_defang_v1_fabric_pb.LogEntry>;
  update(argument: io_defang_v1_fabric_pb.Service, callback: grpc.requestCallback<io_defang_v1_fabric_pb.ServiceInfo>): grpc.ClientUnaryCall;
  update(argument: io_defang_v1_fabric_pb.Service, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.ServiceInfo>): grpc.ClientUnaryCall;
  update(argument: io_defang_v1_fabric_pb.Service, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.ServiceInfo>): grpc.ClientUnaryCall;
  get(argument: io_defang_v1_fabric_pb.ServiceID, callback: grpc.requestCallback<io_defang_v1_fabric_pb.ServiceInfo>): grpc.ClientUnaryCall;
  get(argument: io_defang_v1_fabric_pb.ServiceID, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.ServiceInfo>): grpc.ClientUnaryCall;
  get(argument: io_defang_v1_fabric_pb.ServiceID, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.ServiceInfo>): grpc.ClientUnaryCall;
  delete(argument: io_defang_v1_fabric_pb.ServiceID, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  delete(argument: io_defang_v1_fabric_pb.ServiceID, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  delete(argument: io_defang_v1_fabric_pb.ServiceID, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  publish(argument: io_defang_v1_fabric_pb.Event, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  publish(argument: io_defang_v1_fabric_pb.Event, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  publish(argument: io_defang_v1_fabric_pb.Event, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  getServices(argument: google_protobuf_empty_pb.Empty, callback: grpc.requestCallback<io_defang_v1_fabric_pb.Services>): grpc.ClientUnaryCall;
  getServices(argument: google_protobuf_empty_pb.Empty, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.Services>): grpc.ClientUnaryCall;
  getServices(argument: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.Services>): grpc.ClientUnaryCall;
  generateToken(argument: io_defang_v1_fabric_pb.Auth, callback: grpc.requestCallback<io_defang_v1_fabric_pb.Token>): grpc.ClientUnaryCall;
  generateToken(argument: io_defang_v1_fabric_pb.Auth, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.Token>): grpc.ClientUnaryCall;
  generateToken(argument: io_defang_v1_fabric_pb.Auth, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.Token>): grpc.ClientUnaryCall;
  generateFiles(argument: io_defang_v1_fabric_pb.GenerateFilesRequest, callback: grpc.requestCallback<io_defang_v1_fabric_pb.GenerateFilesResponse>): grpc.ClientUnaryCall;
  generateFiles(argument: io_defang_v1_fabric_pb.GenerateFilesRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.GenerateFilesResponse>): grpc.ClientUnaryCall;
  generateFiles(argument: io_defang_v1_fabric_pb.GenerateFilesRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.GenerateFilesResponse>): grpc.ClientUnaryCall;
  putSecret(argument: io_defang_v1_fabric_pb.SecretValue, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  putSecret(argument: io_defang_v1_fabric_pb.SecretValue, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  putSecret(argument: io_defang_v1_fabric_pb.SecretValue, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  listSecrets(argument: google_protobuf_empty_pb.Empty, callback: grpc.requestCallback<io_defang_v1_fabric_pb.Secrets>): grpc.ClientUnaryCall;
  listSecrets(argument: google_protobuf_empty_pb.Empty, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.Secrets>): grpc.ClientUnaryCall;
  listSecrets(argument: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.Secrets>): grpc.ClientUnaryCall;
  createUploadURL(argument: google_protobuf_empty_pb.Empty, callback: grpc.requestCallback<io_defang_v1_fabric_pb.UploadURLResponse>): grpc.ClientUnaryCall;
  createUploadURL(argument: google_protobuf_empty_pb.Empty, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.UploadURLResponse>): grpc.ClientUnaryCall;
  createUploadURL(argument: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<io_defang_v1_fabric_pb.UploadURLResponse>): grpc.ClientUnaryCall;
}
