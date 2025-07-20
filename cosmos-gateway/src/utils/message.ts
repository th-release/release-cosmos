import { create, fromBinary, toBinary } from '@bufbuild/protobuf';
import { GeneratedType, Registry } from '@cosmjs/proto-signing';
import { defaultRegistryTypes, SigningStargateClient } from '@cosmjs/stargate';

export function createCorrectGeneratedType(): GeneratedType {
    return {
        // encode: 메시지를 Uint8Array로 인코딩
        encode: (message: any, writer?: any): any => {
            const data = new Uint8Array(Buffer.from(JSON.stringify(message)));
            
            // Writer가 제공되면 Writer 패턴 사용
            if (writer) {
                writer.bytes(data);
                return writer;
            }
            
            // Writer가 없으면 간단한 객체 반환
            return {
                finish: () => data,
                bytes: (data: Uint8Array) => ({ finish: () => data }),
                fork: () => ({ finish: () => data }),
                reset: () => ({ finish: () => new Uint8Array() }),
                len: data.length
            };
        },

        // decode: Uint8Array를 메시지로 디코딩
        decode: (input: Uint8Array | any, length?: number): any => {
            let bytes: Uint8Array;
            
            if (input instanceof Uint8Array) {
                bytes = input;
            } else if (input && typeof input.bytes === 'function') {
                // Reader 패턴
                bytes = input.bytes();
            } else {
                bytes = new Uint8Array(input);
            }
            
            try {
                return JSON.parse(Buffer.from(bytes).toString());
            } catch (error) {
                // 디코딩 실패시 빈 객체 반환
                return {};
            }
        },
        // fromPartial: 부분적인 객체에서 완전한 메시지 생성
        fromPartial: (object: any): any => {
            if (!object) return {};
            
            // 부분적인 객체를 완전한 메시지로 변환
            const complete: any = {};
            Object.keys(object).forEach(key => {
                const value = object[key];
                if (value !== undefined && value !== null) {
                    complete[key] = typeof value === 'string' ? value : String(value);
                }
            });
            return complete;
        }
    };
}

// 2. Buf Schema와 함께 사용하는 올바른 GeneratedType
export function createSchemaGeneratedType(schema: any): GeneratedType {
    // @bufbuild/protobuf 패키지 사용
    const { create, toBinary, fromBinary } = require('@bufbuild/protobuf');
    
    return {
        encode: (message: any, writer?: any): any => {
            try {
                const protoMessage = create(schema, message);
                const bytes = toBinary(schema, protoMessage);
                
                if (writer) {
                    writer.bytes(bytes);
                    return writer;
                }
                
                return {
                    finish: () => bytes,
                    bytes: (data: Uint8Array) => ({ finish: () => data }),
                    fork: () => ({ finish: () => bytes }),
                    len: bytes.length
                };
            } catch (error) {
                console.error('Schema encode error:', error);
                throw error;
            }
        },

        decode: (input: Uint8Array | any, length?: number): any => {
            try {
                let bytes: Uint8Array;
                
                if (input instanceof Uint8Array) {
                    bytes = input;
                } else if (input && typeof input.bytes === 'function') {
                    bytes = input.bytes();
                } else {
                    bytes = new Uint8Array(input);
                }
                
                return fromBinary(schema, bytes);
            } catch (error) {
                console.error('Schema decode error:', error);
                return create(schema, {});
            }
        },
        fromPartial: (object: any): any => {
            try {
                return create(schema, object);
            } catch (error) {
                console.error('Schema fromPartial error:', error);
                return create(schema, {});
            }
        }
    };
}


export function createBufRegistry(bufTypes: Array<[string, GeneratedType]>): Registry {
    return new Registry([
        ...defaultRegistryTypes,
        ...bufTypes
    ]);
}
