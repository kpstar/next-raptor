/**
 * @fileoverview gRPC-Web generated client stub for ngoapi
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as testapi_pb from './testapi_pb';


export class NgoAPIClient {
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

  methodInfostreamEvents = new grpcWeb.MethodDescriptor(
    '/ngoapi.NgoAPI/streamEvents',
    grpcWeb.MethodType.SERVER_STREAMING,
    testapi_pb.StreamEventsRequest,
    testapi_pb.StreamEventsResponse,
    (request: testapi_pb.StreamEventsRequest) => {
      return request.serializeBinary();
    },
    testapi_pb.StreamEventsResponse.deserializeBinary
  );

  streamEvents(
    request: testapi_pb.StreamEventsRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/ngoapi.NgoAPI/streamEvents',
      request,
      metadata || {},
      this.methodInfostreamEvents);
  }

}

