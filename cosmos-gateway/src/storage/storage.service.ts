import { DirectSecp256k1HdWallet, DirectSecp256k1Wallet, GeneratedType, Registry } from "@cosmjs/proto-signing";
import { GasPrice, SigningStargateClient } from "@cosmjs/stargate";
import { Request, Response } from "express";
import { MsgCreateData, MsgCreateStorage, MsgDeleteData, MsgDeleteStorage, MsgUpdateData, MsgUpdateStorage } from "src/proto/release/storage/v1/tx";
import { createBufRegistry, createSchemaGeneratedType } from "src/utils/message";


export class StorageService {
  private reigstry: Registry = createBufRegistry(
    [
      ['/release.storage.v1.MsgCreateStorage', MsgCreateStorage],
      ['/release.storage.v1.MsgUpdateStorage', MsgUpdateStorage],
      ['/release.storage.v1.MsgDeleteStorage', MsgDeleteStorage],
      ['/release.storage.v1.MsgCreateData', MsgCreateData],
      ['/release.storage.v1.MsgUpdateData', MsgUpdateData],
      ['/release.storage.v1.MsgDeleteData', MsgDeleteData]
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
