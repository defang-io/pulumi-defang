// GENERATED CODE -- DO NOT EDIT!

// package: io.defang.v1
// file: v1/fabric.proto

import * as v1_fabric_pb from "../v1/fabric_pb";
import * as grpc from "@grpc/grpc-js";

interface IFabricControllerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getStatus: grpc.MethodDefinition<v1_fabric_pb.Void, v1_fabric_pb.Status>;
  tail: grpc.MethodDefinition<v1_fabric_pb.ServiceID, v1_fabric_pb.LogEntry>;
  update: grpc.MethodDefinition<v1_fabric_pb.Service, v1_fabric_pb.Service>;
  get: grpc.MethodDefinition<v1_fabric_pb.ServiceID, v1_fabric_pb.Service>;
  delete: grpc.MethodDefinition<v1_fabric_pb.ServiceID, v1_fabric_pb.Void>;
  publish: grpc.MethodDefinition<v1_fabric_pb.Event, v1_fabric_pb.Void>;
  getServices: grpc.MethodDefinition<v1_fabric_pb.Void, v1_fabric_pb.Services>;
  generateToken: grpc.MethodDefinition<v1_fabric_pb.ServiceID, v1_fabric_pb.Token>;
}

export const FabricControllerService: IFabricControllerService;

export interface IFabricControllerServer extends grpc.UntypedServiceImplementation {
  getStatus: grpc.handleUnaryCall<v1_fabric_pb.Void, v1_fabric_pb.Status>;
  tail: grpc.handleServerStreamingCall<v1_fabric_pb.ServiceID, v1_fabric_pb.LogEntry>;
  update: grpc.handleUnaryCall<v1_fabric_pb.Service, v1_fabric_pb.Service>;
  get: grpc.handleUnaryCall<v1_fabric_pb.ServiceID, v1_fabric_pb.Service>;
  delete: grpc.handleUnaryCall<v1_fabric_pb.ServiceID, v1_fabric_pb.Void>;
  publish: grpc.handleUnaryCall<v1_fabric_pb.Event, v1_fabric_pb.Void>;
  getServices: grpc.handleUnaryCall<v1_fabric_pb.Void, v1_fabric_pb.Services>;
  generateToken: grpc.handleUnaryCall<v1_fabric_pb.ServiceID, v1_fabric_pb.Token>;
}

export class FabricControllerClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getStatus(argument: v1_fabric_pb.Void, callback: grpc.requestCallback<v1_fabric_pb.Status>): grpc.ClientUnaryCall;
  getStatus(argument: v1_fabric_pb.Void, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<v1_fabric_pb.Status>): grpc.ClientUnaryCall;
  getStatus(argument: v1_fabric_pb.Void, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<v1_fabric_pb.Status>): grpc.ClientUnaryCall;
  tail(argument: v1_fabric_pb.ServiceID, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<v1_fabric_pb.LogEntry>;
  tail(argument: v1_fabric_pb.ServiceID, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<v1_fabric_pb.LogEntry>;
  update(argument: v1_fabric_pb.Service, callback: grpc.requestCallback<v1_fabric_pb.Service>): grpc.ClientUnaryCall;
  update(argument: v1_fabric_pb.Service, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<v1_fabric_pb.Service>): grpc.ClientUnaryCall;
  update(argument: v1_fabric_pb.Service, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<v1_fabric_pb.Service>): grpc.ClientUnaryCall;
  get(argument: v1_fabric_pb.ServiceID, callback: grpc.requestCallback<v1_fabric_pb.Service>): grpc.ClientUnaryCall;
  get(argument: v1_fabric_pb.ServiceID, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<v1_fabric_pb.Service>): grpc.ClientUnaryCall;
  get(argument: v1_fabric_pb.ServiceID, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<v1_fabric_pb.Service>): grpc.ClientUnaryCall;
  delete(argument: v1_fabric_pb.ServiceID, callback: grpc.requestCallback<v1_fabric_pb.Void>): grpc.ClientUnaryCall;
  delete(argument: v1_fabric_pb.ServiceID, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<v1_fabric_pb.Void>): grpc.ClientUnaryCall;
  delete(argument: v1_fabric_pb.ServiceID, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<v1_fabric_pb.Void>): grpc.ClientUnaryCall;
  publish(argument: v1_fabric_pb.Event, callback: grpc.requestCallback<v1_fabric_pb.Void>): grpc.ClientUnaryCall;
  publish(argument: v1_fabric_pb.Event, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<v1_fabric_pb.Void>): grpc.ClientUnaryCall;
  publish(argument: v1_fabric_pb.Event, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<v1_fabric_pb.Void>): grpc.ClientUnaryCall;
  getServices(argument: v1_fabric_pb.Void, callback: grpc.requestCallback<v1_fabric_pb.Services>): grpc.ClientUnaryCall;
  getServices(argument: v1_fabric_pb.Void, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<v1_fabric_pb.Services>): grpc.ClientUnaryCall;
  getServices(argument: v1_fabric_pb.Void, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<v1_fabric_pb.Services>): grpc.ClientUnaryCall;
  generateToken(argument: v1_fabric_pb.ServiceID, callback: grpc.requestCallback<v1_fabric_pb.Token>): grpc.ClientUnaryCall;
  generateToken(argument: v1_fabric_pb.ServiceID, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<v1_fabric_pb.Token>): grpc.ClientUnaryCall;
  generateToken(argument: v1_fabric_pb.ServiceID, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<v1_fabric_pb.Token>): grpc.ClientUnaryCall;
}
