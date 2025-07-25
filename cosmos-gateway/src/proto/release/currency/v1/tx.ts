// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               unknown
// source: release/currency/v1/tx.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { Params } from "./params";

export const protobufPackage = "release.currency.v1";

/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** NOTE: All parameters must be supplied. */
  params: Params | undefined;
}

/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {
}

/** MsgCreateToken defines the MsgCreateToken message. */
export interface MsgCreateToken {
  owner: string;
  denom: string;
  name: string;
  symbol: string;
  metadataUrl: string;
  totalSupply: number;
  supply: number;
  decimals: number;
  initialPrice: number;
}

/** MsgCreateTokenResponse defines the MsgCreateTokenResponse message. */
export interface MsgCreateTokenResponse {
}

/** MsgUpdateToken defines the MsgUpdateToken message. */
export interface MsgUpdateToken {
  owner: string;
  denom: string;
  name: string;
  symbol: string;
  metadataUrl: string;
  totalSupply: number;
  supply: number;
  decimals: number;
  initialPrice: number;
}

/** MsgUpdateTokenResponse defines the MsgUpdateTokenResponse message. */
export interface MsgUpdateTokenResponse {
}

/** MsgMintToken defines the MsgMintToken message. */
export interface MsgMintToken {
  owner: string;
  denom: string;
  amount: number;
  to: string;
}

/** MsgMintTokenResponse defines the MsgMintTokenResponse message. */
export interface MsgMintTokenResponse {
}

/** MsgBurnToken defines the MsgBurnToken message. */
export interface MsgBurnToken {
  owner: string;
  denom: string;
  amount: number;
  from: string;
}

/** MsgBurnTokenResponse defines the MsgBurnTokenResponse message. */
export interface MsgBurnTokenResponse {
}

/** MsgTransferToken defines the MsgTransferToken message. */
export interface MsgTransferToken {
  owner: string;
  denom: string;
  amount: number;
  from: string;
  to: string;
}

/** MsgTransferTokenResponse defines the MsgTransferTokenResponse message. */
export interface MsgTransferTokenResponse {
}

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { authority: "", params: undefined };
}

export const MsgUpdateParams: MessageFns<MsgUpdateParams> = {
  encode(message: MsgUpdateParams, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(base?: I): MsgUpdateParams {
    return MsgUpdateParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(object: I): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse: MessageFns<MsgUpdateParamsResponse> = {
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },

  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(base?: I): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(_: I): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

function createBaseMsgCreateToken(): MsgCreateToken {
  return {
    owner: "",
    denom: "",
    name: "",
    symbol: "",
    metadataUrl: "",
    totalSupply: 0,
    supply: 0,
    decimals: 0,
    initialPrice: 0,
  };
}

export const MsgCreateToken: MessageFns<MsgCreateToken> = {
  encode(message: MsgCreateToken, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.symbol !== "") {
      writer.uint32(34).string(message.symbol);
    }
    if (message.metadataUrl !== "") {
      writer.uint32(42).string(message.metadataUrl);
    }
    if (message.totalSupply !== 0) {
      writer.uint32(48).int64(message.totalSupply);
    }
    if (message.supply !== 0) {
      writer.uint32(56).int64(message.supply);
    }
    if (message.decimals !== 0) {
      writer.uint32(64).int64(message.decimals);
    }
    if (message.initialPrice !== 0) {
      writer.uint32(72).int64(message.initialPrice);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.symbol = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.metadataUrl = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }

          message.totalSupply = longToNumber(reader.int64());
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }

          message.supply = longToNumber(reader.int64());
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }

          message.decimals = longToNumber(reader.int64());
          continue;
        }
        case 9: {
          if (tag !== 72) {
            break;
          }

          message.initialPrice = longToNumber(reader.int64());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateToken {
    return {
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      symbol: isSet(object.symbol) ? globalThis.String(object.symbol) : "",
      metadataUrl: isSet(object.metadataUrl) ? globalThis.String(object.metadataUrl) : "",
      totalSupply: isSet(object.totalSupply) ? globalThis.Number(object.totalSupply) : 0,
      supply: isSet(object.supply) ? globalThis.Number(object.supply) : 0,
      decimals: isSet(object.decimals) ? globalThis.Number(object.decimals) : 0,
      initialPrice: isSet(object.initialPrice) ? globalThis.Number(object.initialPrice) : 0,
    };
  },

  toJSON(message: MsgCreateToken): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.symbol !== "") {
      obj.symbol = message.symbol;
    }
    if (message.metadataUrl !== "") {
      obj.metadataUrl = message.metadataUrl;
    }
    if (message.totalSupply !== 0) {
      obj.totalSupply = Math.round(message.totalSupply);
    }
    if (message.supply !== 0) {
      obj.supply = Math.round(message.supply);
    }
    if (message.decimals !== 0) {
      obj.decimals = Math.round(message.decimals);
    }
    if (message.initialPrice !== 0) {
      obj.initialPrice = Math.round(message.initialPrice);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateToken>, I>>(base?: I): MsgCreateToken {
    return MsgCreateToken.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateToken>, I>>(object: I): MsgCreateToken {
    const message = createBaseMsgCreateToken();
    message.owner = object.owner ?? "";
    message.denom = object.denom ?? "";
    message.name = object.name ?? "";
    message.symbol = object.symbol ?? "";
    message.metadataUrl = object.metadataUrl ?? "";
    message.totalSupply = object.totalSupply ?? 0;
    message.supply = object.supply ?? 0;
    message.decimals = object.decimals ?? 0;
    message.initialPrice = object.initialPrice ?? 0;
    return message;
  },
};

function createBaseMsgCreateTokenResponse(): MsgCreateTokenResponse {
  return {};
}

export const MsgCreateTokenResponse: MessageFns<MsgCreateTokenResponse> = {
  encode(_: MsgCreateTokenResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgCreateTokenResponse {
    return {};
  },

  toJSON(_: MsgCreateTokenResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateTokenResponse>, I>>(base?: I): MsgCreateTokenResponse {
    return MsgCreateTokenResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateTokenResponse>, I>>(_: I): MsgCreateTokenResponse {
    const message = createBaseMsgCreateTokenResponse();
    return message;
  },
};

function createBaseMsgUpdateToken(): MsgUpdateToken {
  return {
    owner: "",
    denom: "",
    name: "",
    symbol: "",
    metadataUrl: "",
    totalSupply: 0,
    supply: 0,
    decimals: 0,
    initialPrice: 0,
  };
}

export const MsgUpdateToken: MessageFns<MsgUpdateToken> = {
  encode(message: MsgUpdateToken, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.symbol !== "") {
      writer.uint32(34).string(message.symbol);
    }
    if (message.metadataUrl !== "") {
      writer.uint32(42).string(message.metadataUrl);
    }
    if (message.totalSupply !== 0) {
      writer.uint32(48).int64(message.totalSupply);
    }
    if (message.supply !== 0) {
      writer.uint32(56).int64(message.supply);
    }
    if (message.decimals !== 0) {
      writer.uint32(64).int64(message.decimals);
    }
    if (message.initialPrice !== 0) {
      writer.uint32(72).int64(message.initialPrice);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.symbol = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.metadataUrl = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }

          message.totalSupply = longToNumber(reader.int64());
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }

          message.supply = longToNumber(reader.int64());
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }

          message.decimals = longToNumber(reader.int64());
          continue;
        }
        case 9: {
          if (tag !== 72) {
            break;
          }

          message.initialPrice = longToNumber(reader.int64());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateToken {
    return {
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      symbol: isSet(object.symbol) ? globalThis.String(object.symbol) : "",
      metadataUrl: isSet(object.metadataUrl) ? globalThis.String(object.metadataUrl) : "",
      totalSupply: isSet(object.totalSupply) ? globalThis.Number(object.totalSupply) : 0,
      supply: isSet(object.supply) ? globalThis.Number(object.supply) : 0,
      decimals: isSet(object.decimals) ? globalThis.Number(object.decimals) : 0,
      initialPrice: isSet(object.initialPrice) ? globalThis.Number(object.initialPrice) : 0,
    };
  },

  toJSON(message: MsgUpdateToken): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.symbol !== "") {
      obj.symbol = message.symbol;
    }
    if (message.metadataUrl !== "") {
      obj.metadataUrl = message.metadataUrl;
    }
    if (message.totalSupply !== 0) {
      obj.totalSupply = Math.round(message.totalSupply);
    }
    if (message.supply !== 0) {
      obj.supply = Math.round(message.supply);
    }
    if (message.decimals !== 0) {
      obj.decimals = Math.round(message.decimals);
    }
    if (message.initialPrice !== 0) {
      obj.initialPrice = Math.round(message.initialPrice);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateToken>, I>>(base?: I): MsgUpdateToken {
    return MsgUpdateToken.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateToken>, I>>(object: I): MsgUpdateToken {
    const message = createBaseMsgUpdateToken();
    message.owner = object.owner ?? "";
    message.denom = object.denom ?? "";
    message.name = object.name ?? "";
    message.symbol = object.symbol ?? "";
    message.metadataUrl = object.metadataUrl ?? "";
    message.totalSupply = object.totalSupply ?? 0;
    message.supply = object.supply ?? 0;
    message.decimals = object.decimals ?? 0;
    message.initialPrice = object.initialPrice ?? 0;
    return message;
  },
};

function createBaseMsgUpdateTokenResponse(): MsgUpdateTokenResponse {
  return {};
}

export const MsgUpdateTokenResponse: MessageFns<MsgUpdateTokenResponse> = {
  encode(_: MsgUpdateTokenResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateTokenResponse {
    return {};
  },

  toJSON(_: MsgUpdateTokenResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateTokenResponse>, I>>(base?: I): MsgUpdateTokenResponse {
    return MsgUpdateTokenResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateTokenResponse>, I>>(_: I): MsgUpdateTokenResponse {
    const message = createBaseMsgUpdateTokenResponse();
    return message;
  },
};

function createBaseMsgMintToken(): MsgMintToken {
  return { owner: "", denom: "", amount: 0, to: "" };
}

export const MsgMintToken: MessageFns<MsgMintToken> = {
  encode(message: MsgMintToken, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.amount !== 0) {
      writer.uint32(24).int64(message.amount);
    }
    if (message.to !== "") {
      writer.uint32(34).string(message.to);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgMintToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.amount = longToNumber(reader.int64());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.to = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgMintToken {
    return {
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      amount: isSet(object.amount) ? globalThis.Number(object.amount) : 0,
      to: isSet(object.to) ? globalThis.String(object.to) : "",
    };
  },

  toJSON(message: MsgMintToken): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.amount !== 0) {
      obj.amount = Math.round(message.amount);
    }
    if (message.to !== "") {
      obj.to = message.to;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgMintToken>, I>>(base?: I): MsgMintToken {
    return MsgMintToken.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgMintToken>, I>>(object: I): MsgMintToken {
    const message = createBaseMsgMintToken();
    message.owner = object.owner ?? "";
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? 0;
    message.to = object.to ?? "";
    return message;
  },
};

function createBaseMsgMintTokenResponse(): MsgMintTokenResponse {
  return {};
}

export const MsgMintTokenResponse: MessageFns<MsgMintTokenResponse> = {
  encode(_: MsgMintTokenResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgMintTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgMintTokenResponse {
    return {};
  },

  toJSON(_: MsgMintTokenResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgMintTokenResponse>, I>>(base?: I): MsgMintTokenResponse {
    return MsgMintTokenResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgMintTokenResponse>, I>>(_: I): MsgMintTokenResponse {
    const message = createBaseMsgMintTokenResponse();
    return message;
  },
};

function createBaseMsgBurnToken(): MsgBurnToken {
  return { owner: "", denom: "", amount: 0, from: "" };
}

export const MsgBurnToken: MessageFns<MsgBurnToken> = {
  encode(message: MsgBurnToken, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.amount !== 0) {
      writer.uint32(24).int64(message.amount);
    }
    if (message.from !== "") {
      writer.uint32(34).string(message.from);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgBurnToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.amount = longToNumber(reader.int64());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.from = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgBurnToken {
    return {
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      amount: isSet(object.amount) ? globalThis.Number(object.amount) : 0,
      from: isSet(object.from) ? globalThis.String(object.from) : "",
    };
  },

  toJSON(message: MsgBurnToken): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.amount !== 0) {
      obj.amount = Math.round(message.amount);
    }
    if (message.from !== "") {
      obj.from = message.from;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBurnToken>, I>>(base?: I): MsgBurnToken {
    return MsgBurnToken.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBurnToken>, I>>(object: I): MsgBurnToken {
    const message = createBaseMsgBurnToken();
    message.owner = object.owner ?? "";
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? 0;
    message.from = object.from ?? "";
    return message;
  },
};

function createBaseMsgBurnTokenResponse(): MsgBurnTokenResponse {
  return {};
}

export const MsgBurnTokenResponse: MessageFns<MsgBurnTokenResponse> = {
  encode(_: MsgBurnTokenResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgBurnTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgBurnTokenResponse {
    return {};
  },

  toJSON(_: MsgBurnTokenResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBurnTokenResponse>, I>>(base?: I): MsgBurnTokenResponse {
    return MsgBurnTokenResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBurnTokenResponse>, I>>(_: I): MsgBurnTokenResponse {
    const message = createBaseMsgBurnTokenResponse();
    return message;
  },
};

function createBaseMsgTransferToken(): MsgTransferToken {
  return { owner: "", denom: "", amount: 0, from: "", to: "" };
}

export const MsgTransferToken: MessageFns<MsgTransferToken> = {
  encode(message: MsgTransferToken, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.amount !== 0) {
      writer.uint32(24).int64(message.amount);
    }
    if (message.from !== "") {
      writer.uint32(34).string(message.from);
    }
    if (message.to !== "") {
      writer.uint32(42).string(message.to);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgTransferToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.amount = longToNumber(reader.int64());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.from = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.to = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgTransferToken {
    return {
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      amount: isSet(object.amount) ? globalThis.Number(object.amount) : 0,
      from: isSet(object.from) ? globalThis.String(object.from) : "",
      to: isSet(object.to) ? globalThis.String(object.to) : "",
    };
  },

  toJSON(message: MsgTransferToken): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.amount !== 0) {
      obj.amount = Math.round(message.amount);
    }
    if (message.from !== "") {
      obj.from = message.from;
    }
    if (message.to !== "") {
      obj.to = message.to;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTransferToken>, I>>(base?: I): MsgTransferToken {
    return MsgTransferToken.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTransferToken>, I>>(object: I): MsgTransferToken {
    const message = createBaseMsgTransferToken();
    message.owner = object.owner ?? "";
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? 0;
    message.from = object.from ?? "";
    message.to = object.to ?? "";
    return message;
  },
};

function createBaseMsgTransferTokenResponse(): MsgTransferTokenResponse {
  return {};
}

export const MsgTransferTokenResponse: MessageFns<MsgTransferTokenResponse> = {
  encode(_: MsgTransferTokenResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgTransferTokenResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgTransferTokenResponse {
    return {};
  },

  toJSON(_: MsgTransferTokenResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTransferTokenResponse>, I>>(base?: I): MsgTransferTokenResponse {
    return MsgTransferTokenResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTransferTokenResponse>, I>>(_: I): MsgTransferTokenResponse {
    const message = createBaseMsgTransferTokenResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** CreateToken defines the CreateToken RPC. */
  CreateToken(request: MsgCreateToken): Promise<MsgCreateTokenResponse>;
  /** UpdateToken defines the UpdateToken RPC. */
  UpdateToken(request: MsgUpdateToken): Promise<MsgUpdateTokenResponse>;
  /** MintToken defines the MintToken RPC. */
  MintToken(request: MsgMintToken): Promise<MsgMintTokenResponse>;
  /** BurnToken defines the BurnToken RPC. */
  BurnToken(request: MsgBurnToken): Promise<MsgBurnTokenResponse>;
  /** TransferToken defines the TransferToken RPC. */
  TransferToken(request: MsgTransferToken): Promise<MsgTransferTokenResponse>;
}

export const MsgServiceName = "release.currency.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.UpdateParams = this.UpdateParams.bind(this);
    this.CreateToken = this.CreateToken.bind(this);
    this.UpdateToken = this.UpdateToken.bind(this);
    this.MintToken = this.MintToken.bind(this);
    this.BurnToken = this.BurnToken.bind(this);
    this.TransferToken = this.TransferToken.bind(this);
  }
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateParams", data);
    return promise.then((data) => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }

  CreateToken(request: MsgCreateToken): Promise<MsgCreateTokenResponse> {
    const data = MsgCreateToken.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateToken", data);
    return promise.then((data) => MsgCreateTokenResponse.decode(new BinaryReader(data)));
  }

  UpdateToken(request: MsgUpdateToken): Promise<MsgUpdateTokenResponse> {
    const data = MsgUpdateToken.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateToken", data);
    return promise.then((data) => MsgUpdateTokenResponse.decode(new BinaryReader(data)));
  }

  MintToken(request: MsgMintToken): Promise<MsgMintTokenResponse> {
    const data = MsgMintToken.encode(request).finish();
    const promise = this.rpc.request(this.service, "MintToken", data);
    return promise.then((data) => MsgMintTokenResponse.decode(new BinaryReader(data)));
  }

  BurnToken(request: MsgBurnToken): Promise<MsgBurnTokenResponse> {
    const data = MsgBurnToken.encode(request).finish();
    const promise = this.rpc.request(this.service, "BurnToken", data);
    return promise.then((data) => MsgBurnTokenResponse.decode(new BinaryReader(data)));
  }

  TransferToken(request: MsgTransferToken): Promise<MsgTransferTokenResponse> {
    const data = MsgTransferToken.encode(request).finish();
    const promise = this.rpc.request(this.service, "TransferToken", data);
    return promise.then((data) => MsgTransferTokenResponse.decode(new BinaryReader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(int64: { toString(): string }): number {
  const num = globalThis.Number(int64.toString());
  if (num > globalThis.Number.MAX_SAFE_INTEGER) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (num < globalThis.Number.MIN_SAFE_INTEGER) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return num;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
