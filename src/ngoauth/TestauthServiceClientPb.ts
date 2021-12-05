/**
 * @fileoverview gRPC-Web generated client stub for ngo.auth.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as testauth_pb from './testauth_pb';


export class NgoAuthClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfologinUser = new grpcWeb.MethodDescriptor(
    '/ngo.auth.v1.NgoAuth/loginUser',
    grpcWeb.MethodType.UNARY,
    testauth_pb.LoginUserRequest,
    testauth_pb.LoginUserResponse,
    (request: testauth_pb.LoginUserRequest) => {
      return request.serializeBinary();
    },
    testauth_pb.LoginUserResponse.deserializeBinary
  );

  loginUser(
    request: testauth_pb.LoginUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<testauth_pb.LoginUserResponse>;

  loginUser(
    request: testauth_pb.LoginUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: testauth_pb.LoginUserResponse) => void): grpcWeb.ClientReadableStream<testauth_pb.LoginUserResponse>;

  loginUser(
    request: testauth_pb.LoginUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: testauth_pb.LoginUserResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/ngo.auth.v1.NgoAuth/loginUser',
        request,
        metadata || {},
        this.methodInfologinUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/ngo.auth.v1.NgoAuth/loginUser',
    request,
    metadata || {},
    this.methodInfologinUser);
  }

}

