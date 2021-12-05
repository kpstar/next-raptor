import * as jspb from 'google-protobuf'



export class LoginUserRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): LoginUserRequest;

  getPassword(): string;
  setPassword(value: string): LoginUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginUserRequest): LoginUserRequest.AsObject;
  static serializeBinaryToWriter(message: LoginUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginUserRequest;
  static deserializeBinaryFromReader(message: LoginUserRequest, reader: jspb.BinaryReader): LoginUserRequest;
}

export namespace LoginUserRequest {
  export type AsObject = {
    userid: string,
    password: string,
  }
}

export class LoginUserResponse extends jspb.Message {
  getAccesstoken(): string;
  setAccesstoken(value: string): LoginUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoginUserResponse): LoginUserResponse.AsObject;
  static serializeBinaryToWriter(message: LoginUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginUserResponse;
  static deserializeBinaryFromReader(message: LoginUserResponse, reader: jspb.BinaryReader): LoginUserResponse;
}

export namespace LoginUserResponse {
  export type AsObject = {
    accesstoken: string,
  }
}

