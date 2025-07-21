import { DirectSecp256k1HdWallet, DirectSecp256k1Wallet, Registry } from "@cosmjs/proto-signing";
import { createProtobufRpcClient, GasPrice, ProtobufRpcClient, QueryClient, SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { Request, Response } from "express";
import { Token } from "src/proto/release/currency/v1/token";
import { MsgCreateToken, MsgMintToken, MsgTransferToken, MsgUpdateToken, MsgBurnToken } from "src/proto/release/currency/v1/tx";
import * as currency from "src/proto/release/currency/v1/query";
import { createBufRegistry } from "src/utils/message";

export class CurrencyService {
  private reigstry: Registry = createBufRegistry(
    [
      // Tx messages
      ['/release.currency.v1.MsgCreateToken', MsgCreateToken],
      ['/release.currency.v1.MsgUpdateToken', MsgUpdateToken],
      ['/release.currency.v1.MsgMintToken', MsgMintToken],
      ['/release.currency.v1.MsgBurnToken', MsgBurnToken],
      ['/release.currency.v1.MsgTransferToken', MsgTransferToken],
      // Types
      ['/release.currency.v1.Token', Token],
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

  public async listToken(req: currency.QueryAllTokenRequest) {
    try {
      const client = await this.getProtobufRpcClient();

      const queryCurrency = new currency.QueryClientImpl(client)

      return {
        success: true,
        data: {
          storage: await queryCurrency.ListToken(req)
        }
      };
    } catch (e) {
      return {
        success: false,
        error: e
      };
    }
  }

  public async detailToken(req: currency.QueryGetTokenRequest) {
    try {
      const client = await this.getProtobufRpcClient();

      const queryCurrency = new currency.QueryClientImpl(client)

      return {
        success: true,
        data: {
          currency: await queryCurrency.GetToken(req)
        }
      };
    } catch (e) {
      return {
        success: false,
        error: e
      };
    }
  }

  public async createToken(
    wallet: DirectSecp256k1HdWallet | DirectSecp256k1Wallet, 
    denom: string, 
    name: string, 
    symbol: string, 
    metadataUrl: string, 
    totalSupply: number,
    decimals: number,
    initPrice: number,
  ) {
    if (
      !wallet || 
      (!denom || denom.length == 0) || 
      (!name || name.length == 0) || 
      (!symbol || symbol.length == 0 || symbol.length > 4) ||
      (totalSupply < 1) ||
      (decimals < 1 || decimals > 12) ||
      (initPrice < 0)
    ) {
      return {
        success: false,
        error: "parameters is invalid"
      }
    }
    
    try {
      const [w] = await wallet.getAccounts()

      const client = await SigningStargateClient.connectWithSigner(
        process.env.RPC_ENDPOINT,
        wallet,
        { gasPrice: GasPrice.fromString(process.env.GAS_FEE), registry: this.reigstry }
      );

      const createTokenMsg = {
        typeUrl: '/release.currency.v1.MsgCreateToken',
        value: {
          owner: w.address,
          denom: denom,
          Name: name,
          Symbol: symbol,
          MetadataUrl  :metadataUrl,
          TotalSupply  : totalSupply,
          Supply       : 0,
          Decimals     : decimals,
          InitialPrice : initPrice,
        }
      };
      
      const result = await client.signAndBroadcast(
        w.address,
        [createTokenMsg],
        'auto',
        'Create token'
      );

      client.disconnect();
      return {success: true, result};
    } catch (e) {
      return {
        success: false,
        error: e
      }
    }
  }

  public async updateToken(
    wallet: DirectSecp256k1HdWallet | DirectSecp256k1Wallet, 
    data: currency.QueryGetTokenResponse,
    metadataUrl: string,
    totalSupply: number,
  ) {
    if (!metadataUrl || metadataUrl.length == 0) {
      metadataUrl = data.token.metadataUrl
    }

    if (!totalSupply || totalSupply < 0) {
      totalSupply = data.token.totalSupply
    }

    if (!wallet) {
      return {
        success: false,
        error: "wallet is required"
      }
    }
    
    try {
      const [w] = await wallet.getAccounts()

      const client = await SigningStargateClient.connectWithSigner(
        process.env.RPC_ENDPOINT,
        wallet,
        { gasPrice: GasPrice.fromString(process.env.GAS_FEE), registry: this.reigstry }
      );
      
      const updateTokenMsg = {
        typeUrl: '/release.currency.v1.MsgUpdateToken',
        value: {
          ...data.token,
          totalSupply,
          metadataUrl
        }
      };
      
      const result = await client.signAndBroadcast(
        w.address,
        [updateTokenMsg],
        'auto',
        'Update token'
      );

      client.disconnect();
      return {success: true, result};
    } catch (e) {
      return {
        success: false,
        error: e
      }
    }
  }

  public async getAmount(req: currency.QueryTokenAmountRequest) {
    if ((!req.denom || req.denom.length == 0) || (!req.address || req.address.length == 0)) {
      return {
        success: false,
        error: "denom, address is required"
      }
    }
    
    try {
      const client = await this.getProtobufRpcClient();

      const queryCurrency = new currency.QueryClientImpl(client)

      return {
        success: true,
        data: await queryCurrency.TokenAmount(req)
      };
    } catch (e) {
      return {
        success: false,
        error: e
      }
    }
  }

  public async mintToken(wallet: DirectSecp256k1HdWallet | DirectSecp256k1Wallet, denom: string, amount: number, to: string) {
    if (!wallet || (!denom || denom.length == 0) || (!to || to.length == 0) || amount < 1) {
      return {
        success: false,
        error: "wallet, denom, amount, to is required"
      }
    }
    
    try {
      const [w] = await wallet.getAccounts()

      const client = await SigningStargateClient.connectWithSigner(
        process.env.RPC_ENDPOINT,
        wallet,
        { gasPrice: GasPrice.fromString(process.env.GAS_FEE), registry: this.reigstry }
      );

      const mintMsg = {
        typeUrl: '/release.currency.v1.MsgMintToken',
        value: {
          owner: w.address,
          denom: denom,
          to,
          amount
        }
      };
      
      const result = await client.signAndBroadcast(
        w.address,
        [mintMsg],
        'auto',
        'Mint Token'
      );

      client.disconnect();
      return {success: true, result};
    } catch (e) {
      return {
        success: false,
        error: e
      }
    }
  }

  public async transferToken(wallet: DirectSecp256k1HdWallet | DirectSecp256k1Wallet, denom: string, amount: number, to: string) {
    if (!wallet || (!denom || denom.length == 0) || (!to || to.length == 0) || amount < 1) {
      return {
        success: false,
        error: "wallet, denom, amount, to is required"
      }
    }
    
    try {
      const [w] = await wallet.getAccounts()

      const client = await SigningStargateClient.connectWithSigner(
        process.env.RPC_ENDPOINT,
        wallet,
        { gasPrice: GasPrice.fromString(process.env.GAS_FEE), registry: this.reigstry }
      );

      const TransferTokenMsg = {
        typeUrl: '/release.currency.v1.MsgTransferToken',
        value: {
          owner: w.address,
          denom: denom,
          from: w.address,
          to,
          amount
        }
      };
      
      const result = await client.signAndBroadcast(
        w.address,
        [TransferTokenMsg],
        'auto',
        'Transfer Token'
      );

      client.disconnect();
      return {success: true, result};
    } catch (e) {
      return {
        success: false,
        error: e
      }
    }
  }

  public async burnToken(wallet: DirectSecp256k1HdWallet | DirectSecp256k1Wallet, denom: string, amount: number) {
    if (!wallet || (!denom || denom.length == 0) || amount < 1) {
      return {
        success: false,
        error: "wallet, denom, amount is invalid"
      }
    }
    
    try {
      const [w] = await wallet.getAccounts()

      const client = await SigningStargateClient.connectWithSigner(
        process.env.RPC_ENDPOINT,
        wallet,
        { gasPrice: GasPrice.fromString(process.env.GAS_FEE), registry: this.reigstry }
      );

      const BurnTokenMsg = {
        typeUrl: '/release.currency.v1.MsgBurnToken',
        value: {
          owner: w.address,
          from: w.address,
          denom: denom,
          amount: amount,
        }
      };
      
      const result = await client.signAndBroadcast(
        w.address,
        [BurnTokenMsg],
        'auto',
        'Burn Token'
      );

      client.disconnect();
      return {success: true, result};
    } catch (e) {
      return {
        success: false,
        error: e
      }
    }
  }
}
