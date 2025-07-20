import { DirectSecp256k1HdWallet, DirectSecp256k1Wallet, GeneratedType, Registry } from "@cosmjs/proto-signing";
import { GasPrice, SigningStargateClient } from "@cosmjs/stargate";
import { Request, Response } from "express";
import { createBufRegistry, createSchemaGeneratedType } from "src/utils/message";
import {
  MsgCreateStorageSchema,
  MsgUpdateStorageSchema,
  MsgDeleteStorageSchema,
  MsgCreateDataSchema,
  MsgUpdateDataSchema,
  MsgDeleteDataSchema
} from '../proto/storage/v1/tx_pb'; // 실제 경로로 변경


export class StorageService {
  private reigstry: Registry = createBufRegistry(
    [
      ['/release.storage.v1.MsgCreateStorage', createSchemaGeneratedType(MsgCreateStorageSchema)],
      ['/release.storage.v1.MsgUpdateStorage', createSchemaGeneratedType(MsgUpdateStorageSchema)],
      ['/release.storage.v1.MsgDeleteStorage', createSchemaGeneratedType(MsgDeleteStorageSchema)],
      ['/release.storage.v1.MsgCreateData', createSchemaGeneratedType(MsgCreateDataSchema)],
      ['/release.storage.v1.MsgUpdateData', createSchemaGeneratedType(MsgUpdateDataSchema)],
      ['/release.storage.v1.MsgDeleteData', createSchemaGeneratedType(MsgDeleteDataSchema)]
  ]
  )
  
  public getStatus(req: Request, res: Response): Response<any, Record<string, any>> {
    return res.status(200).send({
      status: true,
      internetProtocol: req.ip
    });
  }

  public async createStorage(wallet: DirectSecp256k1HdWallet | DirectSecp256k1Wallet, denom: string, data: string = '{}') {
    let dataformat = {}
    try {
      dataformat = JSON.parse(data)
    } catch (e) {
      return {
        success: false,
        error: e
      }
    }

    if (!wallet || (!denom || denom.length == 0)) {
      return {
        success: false,
        error: "wallet, denom is required"
      }
    }
    
    try {
      const [w] = await wallet.getAccounts()

      const client = await SigningStargateClient.connectWithSigner(
        process.env.RPC_ENDPOINT,
        wallet,
        { gasPrice: GasPrice.fromString(process.env.GAS_FEE), registry: this.reigstry }
      );

      const createStorageMsg = {
        typeUrl: '/release.storage.v1.MsgCreateStorage',
        value: {
            owner: w.address,
            denom: denom,
            data: data
        }
      };
      
      const result = await client.signAndBroadcast(
        w.address,
        [createStorageMsg],
        'auto',
        'Create storage'
      );

      client.disconnect();
      return {success: true, result};
    } catch (e) {
      console.log(e)
      return {
        success: false,
        error: e
      }
    }
  }
}
