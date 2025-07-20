import { GeneratedType, Registry } from '@cosmjs/proto-signing';
import { defaultRegistryTypes, SigningStargateClient } from '@cosmjs/stargate';

export function createMessageType(encode = null, decode = null) {
    return {
        encode: encode || ((msg) => Buffer.from(JSON.stringify(msg))),
        decode: decode || ((bytes) => JSON.parse(bytes.toString())),
        fromJSON: (obj) => obj,
        toJSON: (msg) => msg
    };
}

export function createSimpleRegistryTS(messageTypes: string[]): Registry {
    const simpleType = {
        encode: (msg: any) => new Uint8Array(Buffer.from(JSON.stringify(msg))),
        decode: (bytes: Uint8Array) => JSON.parse(Buffer.from(bytes).toString()),
        fromJSON: (obj: any) => obj,
        toJSON: (msg: any) => msg,
        fromPartial: (obj: any) => obj
    } as GeneratedType;

    const registryEntries: Array<[string, GeneratedType]> = messageTypes.map(
        typeUrl => [typeUrl, simpleType]
    );

    return new Registry([
        ...defaultRegistryTypes,
        ...registryEntries
    ]);
}

export function createBufHelper(MessageClass) {
    return {
        encode: (message) => {
            const msg = new MessageClass();
            Object.keys(message).forEach(key => {
                const setterName = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
                if (typeof msg[setterName] === 'function') {
                    msg[setterName](message[key]);
                }
            });
            return msg.serializeBinary();
        },
        decode: (bytes) => {
            const msg = MessageClass.deserializeBinary(bytes);
            // 자동으로 모든 필드 추출
            const result = {};
            // 이 부분은 생성된 proto 클래스에 따라 조정 필요
            return result;
        },
        fromJSON: (obj) => obj,
        toJSON: (msg) => msg
    };
}
