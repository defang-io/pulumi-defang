// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// protos/v1/fabric.proto
'use strict';
var grpc = require('@grpc/grpc-js');
var io_defang_v1_fabric_pb = require('../../../io/defang/v1/fabric_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_defang_v1_Auth(arg) {
  if (!(arg instanceof io_defang_v1_fabric_pb.Auth)) {
    throw new Error('Expected argument of type io.defang.v1.Auth');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_defang_v1_Auth(buffer_arg) {
  return io_defang_v1_fabric_pb.Auth.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_defang_v1_Event(arg) {
  if (!(arg instanceof io_defang_v1_fabric_pb.Event)) {
    throw new Error('Expected argument of type io.defang.v1.Event');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_defang_v1_Event(buffer_arg) {
  return io_defang_v1_fabric_pb.Event.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_defang_v1_GenerateFilesRequest(arg) {
  if (!(arg instanceof io_defang_v1_fabric_pb.GenerateFilesRequest)) {
    throw new Error('Expected argument of type io.defang.v1.GenerateFilesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_defang_v1_GenerateFilesRequest(buffer_arg) {
  return io_defang_v1_fabric_pb.GenerateFilesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_defang_v1_GenerateFilesResponse(arg) {
  if (!(arg instanceof io_defang_v1_fabric_pb.GenerateFilesResponse)) {
    throw new Error('Expected argument of type io.defang.v1.GenerateFilesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_defang_v1_GenerateFilesResponse(buffer_arg) {
  return io_defang_v1_fabric_pb.GenerateFilesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_defang_v1_LogEntry(arg) {
  if (!(arg instanceof io_defang_v1_fabric_pb.LogEntry)) {
    throw new Error('Expected argument of type io.defang.v1.LogEntry');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_defang_v1_LogEntry(buffer_arg) {
  return io_defang_v1_fabric_pb.LogEntry.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_defang_v1_SecretValue(arg) {
  if (!(arg instanceof io_defang_v1_fabric_pb.SecretValue)) {
    throw new Error('Expected argument of type io.defang.v1.SecretValue');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_defang_v1_SecretValue(buffer_arg) {
  return io_defang_v1_fabric_pb.SecretValue.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_defang_v1_Secrets(arg) {
  if (!(arg instanceof io_defang_v1_fabric_pb.Secrets)) {
    throw new Error('Expected argument of type io.defang.v1.Secrets');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_defang_v1_Secrets(buffer_arg) {
  return io_defang_v1_fabric_pb.Secrets.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_defang_v1_Service(arg) {
  if (!(arg instanceof io_defang_v1_fabric_pb.Service)) {
    throw new Error('Expected argument of type io.defang.v1.Service');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_defang_v1_Service(buffer_arg) {
  return io_defang_v1_fabric_pb.Service.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_defang_v1_ServiceID(arg) {
  if (!(arg instanceof io_defang_v1_fabric_pb.ServiceID)) {
    throw new Error('Expected argument of type io.defang.v1.ServiceID');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_defang_v1_ServiceID(buffer_arg) {
  return io_defang_v1_fabric_pb.ServiceID.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_defang_v1_ServiceInfo(arg) {
  if (!(arg instanceof io_defang_v1_fabric_pb.ServiceInfo)) {
    throw new Error('Expected argument of type io.defang.v1.ServiceInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_defang_v1_ServiceInfo(buffer_arg) {
  return io_defang_v1_fabric_pb.ServiceInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_defang_v1_Services(arg) {
  if (!(arg instanceof io_defang_v1_fabric_pb.Services)) {
    throw new Error('Expected argument of type io.defang.v1.Services');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_defang_v1_Services(buffer_arg) {
  return io_defang_v1_fabric_pb.Services.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_defang_v1_Status(arg) {
  if (!(arg instanceof io_defang_v1_fabric_pb.Status)) {
    throw new Error('Expected argument of type io.defang.v1.Status');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_defang_v1_Status(buffer_arg) {
  return io_defang_v1_fabric_pb.Status.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_defang_v1_Token(arg) {
  if (!(arg instanceof io_defang_v1_fabric_pb.Token)) {
    throw new Error('Expected argument of type io.defang.v1.Token');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_defang_v1_Token(buffer_arg) {
  return io_defang_v1_fabric_pb.Token.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_defang_v1_UploadURLResponse(arg) {
  if (!(arg instanceof io_defang_v1_fabric_pb.UploadURLResponse)) {
    throw new Error('Expected argument of type io.defang.v1.UploadURLResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_defang_v1_UploadURLResponse(buffer_arg) {
  return io_defang_v1_fabric_pb.UploadURLResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_io_defang_v1_Version(arg) {
  if (!(arg instanceof io_defang_v1_fabric_pb.Version)) {
    throw new Error('Expected argument of type io.defang.v1.Version');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_io_defang_v1_Version(buffer_arg) {
  return io_defang_v1_fabric_pb.Version.deserializeBinary(new Uint8Array(buffer_arg));
}


var FabricControllerService = exports.FabricControllerService = {
  getStatus: {
    path: '/io.defang.v1.FabricController/GetStatus',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: io_defang_v1_fabric_pb.Status,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_io_defang_v1_Status,
    responseDeserialize: deserialize_io_defang_v1_Status,
  },
  // public
getVersion: {
    path: '/io.defang.v1.FabricController/GetVersion',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: io_defang_v1_fabric_pb.Version,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_io_defang_v1_Version,
    responseDeserialize: deserialize_io_defang_v1_Version,
  },
  // public
tail: {
    path: '/io.defang.v1.FabricController/Tail',
    requestStream: false,
    responseStream: true,
    requestType: io_defang_v1_fabric_pb.ServiceID,
    responseType: io_defang_v1_fabric_pb.LogEntry,
    requestSerialize: serialize_io_defang_v1_ServiceID,
    requestDeserialize: deserialize_io_defang_v1_ServiceID,
    responseSerialize: serialize_io_defang_v1_LogEntry,
    responseDeserialize: deserialize_io_defang_v1_LogEntry,
  },
  update: {
    path: '/io.defang.v1.FabricController/Update',
    requestStream: false,
    responseStream: false,
    requestType: io_defang_v1_fabric_pb.Service,
    responseType: io_defang_v1_fabric_pb.ServiceInfo,
    requestSerialize: serialize_io_defang_v1_Service,
    requestDeserialize: deserialize_io_defang_v1_Service,
    responseSerialize: serialize_io_defang_v1_ServiceInfo,
    responseDeserialize: deserialize_io_defang_v1_ServiceInfo,
  },
  get: {
    path: '/io.defang.v1.FabricController/Get',
    requestStream: false,
    responseStream: false,
    requestType: io_defang_v1_fabric_pb.ServiceID,
    responseType: io_defang_v1_fabric_pb.ServiceInfo,
    requestSerialize: serialize_io_defang_v1_ServiceID,
    requestDeserialize: deserialize_io_defang_v1_ServiceID,
    responseSerialize: serialize_io_defang_v1_ServiceInfo,
    responseDeserialize: deserialize_io_defang_v1_ServiceInfo,
  },
  delete: {
    path: '/io.defang.v1.FabricController/Delete',
    requestStream: false,
    responseStream: false,
    requestType: io_defang_v1_fabric_pb.ServiceID,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_io_defang_v1_ServiceID,
    requestDeserialize: deserialize_io_defang_v1_ServiceID,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  publish: {
    path: '/io.defang.v1.FabricController/Publish',
    requestStream: false,
    responseStream: false,
    requestType: io_defang_v1_fabric_pb.Event,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_io_defang_v1_Event,
    requestDeserialize: deserialize_io_defang_v1_Event,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // rpc Promote(google.protobuf.Empty) returns (google.protobuf.Empty);
getServices: {
    path: '/io.defang.v1.FabricController/GetServices',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: io_defang_v1_fabric_pb.Services,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_io_defang_v1_Services,
    responseDeserialize: deserialize_io_defang_v1_Services,
  },
  generateToken: {
    path: '/io.defang.v1.FabricController/GenerateToken',
    requestStream: false,
    responseStream: false,
    requestType: io_defang_v1_fabric_pb.Auth,
    responseType: io_defang_v1_fabric_pb.Token,
    requestSerialize: serialize_io_defang_v1_Auth,
    requestDeserialize: deserialize_io_defang_v1_Auth,
    responseSerialize: serialize_io_defang_v1_Token,
    responseDeserialize: deserialize_io_defang_v1_Token,
  },
  generateFiles: {
    path: '/io.defang.v1.FabricController/GenerateFiles',
    requestStream: false,
    responseStream: false,
    requestType: io_defang_v1_fabric_pb.GenerateFilesRequest,
    responseType: io_defang_v1_fabric_pb.GenerateFilesResponse,
    requestSerialize: serialize_io_defang_v1_GenerateFilesRequest,
    requestDeserialize: deserialize_io_defang_v1_GenerateFilesRequest,
    responseSerialize: serialize_io_defang_v1_GenerateFilesResponse,
    responseDeserialize: deserialize_io_defang_v1_GenerateFilesResponse,
  },
  putSecret: {
    path: '/io.defang.v1.FabricController/PutSecret',
    requestStream: false,
    responseStream: false,
    requestType: io_defang_v1_fabric_pb.SecretValue,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_io_defang_v1_SecretValue,
    requestDeserialize: deserialize_io_defang_v1_SecretValue,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  listSecrets: {
    path: '/io.defang.v1.FabricController/ListSecrets',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: io_defang_v1_fabric_pb.Secrets,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_io_defang_v1_Secrets,
    responseDeserialize: deserialize_io_defang_v1_Secrets,
  },
  // no values
createUploadURL: {
    path: '/io.defang.v1.FabricController/CreateUploadURL',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: io_defang_v1_fabric_pb.UploadURLResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_io_defang_v1_UploadURLResponse,
    responseDeserialize: deserialize_io_defang_v1_UploadURLResponse,
  },
  // rpc DeleteSecret(SecretValue) returns (google.protobuf.Empty);
};

exports.FabricControllerClient = grpc.makeGenericClientConstructor(FabricControllerService);
