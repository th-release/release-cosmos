import { DirectSecp256k1HdWallet, DirectSecp256k1Wallet, Registry } from "@cosmjs/proto-signing";
import { createProtobufRpcClient, GasPrice, ProtobufRpcClient, QueryClient, SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { Request, Response } from "express";
import * as storage from "src/proto/release/storage/v1/query";
import { Storage } from "src/proto/release/storage/v1/storage";
import { MsgCreateData, MsgCreateStorage, MsgDeleteData, MsgDeleteStorage, MsgUpdateData, MsgUpdateStorage } from "src/proto/release/storage/v1/tx";
import { createBufRegistry } from "src/utils/message";


export class StorageService {
  private reigstry: Registry = createBufRegistry(
    [
      ['/release.storage.v1.MsgCreateStorage', MsgCreateStorage],
      ['/release.storage.v1.MsgUpdateStorage', MsgUpdateStorage],
      ['/release.storage.v1.MsgDeleteStorage', MsgDeleteStorage],
      ['/release.storage.v1.MsgCreateData', MsgCreateData],
      ['/release.storage.v1.MsgUpdateData', MsgUpdateData],
      ['/release.storage.v1.MsgDeleteData', MsgDeleteData],
      ['/release.storage.v1.Storage', Storage],
    ]
  )
  
  public getStatus(req: Request, res: Response): Response<any, Record<string, any>> {
    return res.status(200).send({
      status: true,
      internetProtocol: req.ip
    });
  }

  private async getQueryclient(): Promise<QueryClient> {
    const tmClient = await Tendermint34Client.connect(process.env.RPC_ENDPOINT || "http://localhost:26657");
    return new QueryClient(tmClient);
  }

  private async getProtobufRpcClient(): Promise<ProtobufRpcClient> {
    return createProtobufRpcClient(await this.getQueryclient());
  }

  private async getStargateClient(): Promise<StargateClient> {
    return await StargateClient.connect(process.env.RPC_ENDPOINT || "http://localhost:26657");
  }


  public async listStorage(req: storage.QueryAllStorageRequest) {
    try {
      const client = await this.getProtobufRpcClient();

      const queryStroage = new storage.QueryClientImpl(client)

      return {
        success: true,
        data: {
          storage: await queryStroage.ListStorage(req)
        }
      };
    } catch (e) {
      console.log(e)
      return {
        success: false,
        error: e
      };
    }
  }

  public async detailStorage(req: storage.QueryGetStorageRequest) {
    try {
      const client = await this.getProtobufRpcClient();

      const queryStroage = new storage.QueryClientImpl(client)

      return {
        success: true,
        data: {
          storage: await queryStroage.GetStorage(req)
        }
      };
    } catch (e) {
      return {
        success: false,
        error: e
      };
    }
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

  public async updateStorage(wallet: DirectSecp256k1HdWallet | DirectSecp256k1Wallet, denom: string, data: string = '{}') {
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
        typeUrl: '/release.storage.v1.MsgUpdateStorage',
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
        'Update storage'
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
