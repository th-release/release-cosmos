import { Bip39, Random } from "@cosmjs/crypto";
import { coins, DirectSecp256k1HdWallet, DirectSecp256k1Wallet } from "@cosmjs/proto-signing";
import { GasPrice, SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { Request, Response } from "express";
import { BlockchainService } from "src/blockchain/blockchain.service";

export class WalletService {
  private readonly blockchainService: BlockchainService = new BlockchainService();

  public getStatus(req: Request, res: Response): Response<any, Record<string, any>> {
    return res.status(200).send({
      status: true,
      internetProtocol: req.ip
    });
  }

  public async createPrivateKeyWallet() {
    try {
      const privateKey = this.blockchainService.createPrivateKey()
      
      const wallet = await DirectSecp256k1Wallet.fromKey(privateKey.privateKeyBytes, process.env.ADDRESS_PREFIX);

      const [firstAccount] = await wallet.getAccounts();

      return {
        success: true,
        algo: firstAccount.algo,
        address: firstAccount.address,
        pubkey: Buffer.from(firstAccount.pubkey).toString('hex'),
        private: privateKey.privateKeyString
      }
    } catch (e) {
      return {
        success: false,
        error: e
      }
    }
  }

  public async createMnemonicWallet() {
    try {
      const mnemonic = this.blockchainService.createMnemonic();

      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic.mnemonicString, {
        prefix: process.env.ADDRESS_PREFIX
      });

      const [firstAccount] = await wallet.getAccounts();

      return {
        success: true,
        algo: firstAccount.algo,
        address: firstAccount.address,
        pubkey: Buffer.from(firstAccount.pubkey).toString('hex'),
        private: mnemonic
      }
    } catch (e) {
      return {
        success: false,
        error: e
      }
    }
  }

  public async restoreMnemonicWallet(mnemonic: string) {
    try {
      if (!mnemonic) {
        return {
          success: false,
          error: "mnemonic is required"
        }
      }

      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: process.env.ADDRESS_PREFIX
      });

      const [firstAccount] = await wallet.getAccounts();

      return {
        success: true,
        algo: firstAccount.algo,
        address: firstAccount.address,
        pubkey: Buffer.from(firstAccount.pubkey).toString('hex'),
        mnemonic
      }
    } catch (e) {
      return {
        success: false,
        error: e
      }
    }
  }

  public async restorePrivateKeyWallet(privateKey: string) {
    try {
      if (!privateKey) {
        return {
          success: false,
          error: "PrivateKey is required"
        }
      }

      const privateKeyHex = Buffer.from(privateKey, 'hex');
      const wallet = await DirectSecp256k1Wallet.fromKey(privateKeyHex, process.env.ADDRESS_PREFIX);

      const [firstAccount] = await wallet.getAccounts();

      return {
        success: true,
        wallet,
        algo: firstAccount.algo,
        address: firstAccount.address,
        pubkey: Buffer.from(firstAccount.pubkey).toString('hex'),
        private: Buffer.from(privateKey).toString('hex')
      }
    } catch (e) {
      return {
        success: false,
        error: e
      }
    }
  }

  public async getBalance(address: string) {
    if (!address || address.length == 0) {
      return {
        success: false,
        error: "address is required"
      }
    }

    const client = await StargateClient.connect(process.env.RPC_ENDPOINT);
    try {
      const allBalances = await client.getAllBalances(address);

      return {
        success: true,
        balances: allBalances
      }
    } catch (e) {
      return {
        success: false,
        error: e
      }
    } finally {
      client.disconnect();
    }
  }

  public async sendWithPrivateKey(privateKey: string, to: string, amount: number, memo: string = '', denom: string = process.env.DENOM) {
    try {
      const privateKeyBytes = Buffer.from(privateKey, 'hex');
      const wallet = await DirectSecp256k1Wallet.fromKey(privateKeyBytes, process.env.ADDRESS_PREFIX);
  
      const [firstAccount] = await wallet.getAccounts();
      const fromAddress = firstAccount.address;
  
      const client = await SigningStargateClient.connectWithSigner(
        process.env.RPC_ENDPOINT,
        wallet,
        {
          gasPrice: GasPrice.fromString(process.env.GAS_FEE)
        }
      );

      const result = await client.sendTokens(
        fromAddress,
        to,
        coins(amount, denom), // [{ denom, amount }] 형태로 변환
        'auto',
        memo
      );

      client.disconnect();

      return {
        success: true,
        txHash: result.transactionHash,
        height: result.height,
        gasUsed: result.gasUsed,
        gasWanted: result.gasWanted,
        fromAddress,
        to,
        amount,
        denom,
        memo
    };
    } catch (e) {
      return {
        success: false,
        error: e
      };
    }
  }

  public async sendWithMnemonic(mnemonic: string, to: string, amount: number, memo: string = '', denom: string = process.env.DENOM) {
    try {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: process.env.ADDRESS_PREFIX
      });
  
      const [firstAccount] = await wallet.getAccounts();
      const fromAddress = firstAccount.address;
  
      const client = await SigningStargateClient.connectWithSigner(
        process.env.RPC_ENDPOINT,
        wallet,
        {
          gasPrice: GasPrice.fromString(process.env.GAS_FEE)
        }
      );

      const result = await client.sendTokens(
        fromAddress,
        to,
        coins(amount, denom), // [{ denom, amount }] 형태로 변환
        'auto',
        memo
      );

      client.disconnect();

      return {
        success: true,
        txHash: result.transactionHash,
        height: result.height,
        gasUsed: result.gasUsed,
        gasWanted: result.gasWanted,
        fromAddress,
        to,
        amount,
        denom,
        memo
    };
    } catch (e) {
      return {
        success: false,
        error: e
      };
    }
  }
}
