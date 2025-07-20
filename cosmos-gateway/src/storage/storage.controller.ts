import { Router } from "express";
import {StorageService} from "./storage.service";
import { WalletService } from "src/wallet/wallet.service";
import { QueryDataRequest } from "src/proto/release/storage/v1/query";

export class StorageController {
  private router: Router = Router();
  private readonly storageService: StorageService = new StorageService();
  private readonly walletService: WalletService = new WalletService()

  constructor(prefix: string) {
    this.initializeRoutes(prefix);
  }

  private initializeRoutes(prefix: string): void {
    this.router.get(`${prefix}`, (req, res) => this.storageService.getStatus(req, res));

    this.router.get(`${prefix}/list`, async(req, res) => {
      const { offset = "0", limit = "10" } = req.query

      const result = await this.storageService.listStorage({
        pagination: {
          key: new Uint8Array(0),
          offset: +offset,
          limit: +limit,
          countTotal: true,
          reverse: false,
        }
      })

      return res.status(200).json(result)
    });

    this.router.get(`${prefix}/detail/:denon`, async (req, res) => {
      const result = await this.storageService.detailStorage({
        denom: req.params.denon
      })

      return res.status(200).json(result)
    });

    this.router.post(`${prefix}/mnemonic/create`, async (req, res) => {
      const { mnemonic, denom, data } = req.body

      const wallet = await this.walletService.walletFromMnemonic(mnemonic)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const result = await this.storageService.createStorage(wallet.wallet, denom, data)

      if (!result.success) {
        return res.status(500).json(result)
      }

      return res.status(201).json({
        success: result.success,
        response: result.result.msgResponses,
        gasUsed: result.result.gasUsed.toString(),
        gasWanted: result.result.gasWanted.toString(),
        height: result.result.height.toString(),
        txHash: result.result.transactionHash,
        txIndex: result.result.txIndex,
      })
    })

    this.router.post(`${prefix}/privatekey/create`, async (req, res) => {
      const { privatekey, denom, data } = req.body
      const wallet = await this.walletService.walletFromPrivateKey(privatekey)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const result = await this.storageService.createStorage(wallet.wallet, denom, data)

      if (!result.success) {
        return res.status(500).json(result)
      }

      return res.status(201).json({
        success: result.success,
        response: result.result.msgResponses,
        gasUsed: result.result.gasUsed.toString(),
        gasWanted: result.result.gasWanted.toString(),
        height: result.result.height.toString(),
        txHash: result.result.transactionHash,
        txIndex: result.result.txIndex,
      })
    })

    this.router.put(`${prefix}/mnemonic/update`, async (req, res) => {
      const { mnemonic, denom, data } = req.body

      const wallet = await this.walletService.walletFromMnemonic(mnemonic)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const result = await this.storageService.updateStorage(wallet.wallet, denom, data)

      if (!result.success) {
        return res.status(500).json(result)
      }

      return res.status(201).json({
        success: result.success,
        response: result.result.msgResponses,
        gasUsed: result.result.gasUsed.toString(),
        gasWanted: result.result.gasWanted.toString(),
        height: result.result.height.toString(),
        txHash: result.result.transactionHash,
        txIndex: result.result.txIndex,
      })
    })

    this.router.put(`${prefix}/privatekey/update`, async (req, res) => {
      const { privatekey, denom, data } = req.body
      const wallet = await this.walletService.walletFromPrivateKey(privatekey)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const result = await this.storageService.updateStorage(wallet.wallet, denom, data)

      if (!result.success) {
        return res.status(500).json(result)
      }

      return res.status(201).json({
        success: result.success,
        response: result.result.msgResponses,
        gasUsed: result.result.gasUsed.toString(),
        gasWanted: result.result.gasWanted.toString(),
        height: result.result.height.toString(),
        txHash: result.result.transactionHash,
        txIndex: result.result.txIndex,
      })
    })

    this.router.delete(`${prefix}/mnemonic/delete`, async (req, res) => {
      const { mnemonic, denom } = req.body

      const wallet = await this.walletService.walletFromMnemonic(mnemonic)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const result = await this.storageService.deleteStorage(wallet.wallet, denom)

      if (!result.success) {
        return res.status(500).json(result)
      }

      return res.status(201).json({
        success: result.success,
        response: result.result.msgResponses,
        gasUsed: result.result.gasUsed.toString(),
        gasWanted: result.result.gasWanted.toString(),
        height: result.result.height.toString(),
        txHash: result.result.transactionHash,
        txIndex: result.result.txIndex,
      })
    })

    this.router.delete(`${prefix}/privatekey/delete`, async (req, res) => {
      const { privatekey, denom } = req.body
      const wallet = await this.walletService.walletFromPrivateKey(privatekey)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const result = await this.storageService.deleteStorage(wallet.wallet, denom)

      if (!result.success) {
        return res.status(500).json(result)
      }

      return res.status(201).json({
        success: result.success,
        response: result.result.msgResponses,
        gasUsed: result.result.gasUsed.toString(),
        gasWanted: result.result.gasWanted.toString(),
        height: result.result.height.toString(),
        txHash: result.result.transactionHash,
        txIndex: result.result.txIndex,
      })
    })

    this.router.get(`${prefix}/key/:denom/:key`, async (req, res) => {
      const { denom, key } = req.params

      const result = await this.storageService.getStorageKey({
        denom,key
      })

      if (!result.success) {
        return res.status(500).json(result)
      }

      return res.status(200).json({
        success: result.success,
        data: result.data.value
      })
    })

    this.router.post(`${prefix}/mnemonic/data/:denom/create`, async (req, res) => {
      const { denom } = req.params
      const { mnemonic, key, value } = req.body

      const wallet = await this.walletService.walletFromMnemonic(mnemonic)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const data = await this.storageService.getStorageKey({
        denom,key
      })

      if (data.success) {
        return res.status(500).json(data)
      }
      
      const result = await this.storageService.createData(wallet.wallet, denom, key, value)

      return res.status(200).json({
        success: result.success,
        response: result.result.msgResponses,
        gasUsed: result.result.gasUsed.toString(),
        gasWanted: result.result.gasWanted.toString(),
        height: result.result.height.toString(),
        txHash: result.result.transactionHash,
        txIndex: result.result.txIndex,
      })
    })

    this.router.post(`${prefix}/privateKey/data/:denom/create`, async (req, res) => {
      const { denom } = req.params
      const { privateKey, key, value } = req.body

      const wallet = await this.walletService.walletFromPrivateKey(privateKey)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const data = await this.storageService.getStorageKey({
        denom,key
      })

      if (data.success) {
        return res.status(500).json({
          ...data,
          success: false,
          error: "duplicate data"
        })
      }
      
      const result = await this.storageService.createData(wallet.wallet, denom, key, value)

      return res.status(200).json({
        success: result.success,
        response: result.result.msgResponses,
        gasUsed: result.result.gasUsed.toString(),
        gasWanted: result.result.gasWanted.toString(),
        height: result.result.height.toString(),
        txHash: result.result.transactionHash,
        txIndex: result.result.txIndex,
      })
    })

    this.router.put(`${prefix}/mnemonic/data/:denom/update`, async (req, res) => {
      const { denom } = req.params
      const { mnemonic, key, value } = req.body

      const wallet = await this.walletService.walletFromMnemonic(mnemonic)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const data = await this.storageService.getStorageKey({
        denom,key
      })

      if (!data.success) {
        return res.status(500).json(data)
      }
      
      const result = await this.storageService.updateData(wallet.wallet, denom, key, value)

      return res.status(200).json({
        success: result.success,
        response: result.result.msgResponses,
        gasUsed: result.result.gasUsed.toString(),
        gasWanted: result.result.gasWanted.toString(),
        height: result.result.height.toString(),
        txHash: result.result.transactionHash,
        txIndex: result.result.txIndex,
      })
    })

    this.router.put(`${prefix}/privateKey/data/:denom/update`, async (req, res) => {
      const { denom } = req.params
      const { privateKey, key, value } = req.body

      const wallet = await this.walletService.walletFromPrivateKey(privateKey)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const data = await this.storageService.getStorageKey({
        denom,key
      })

      if (!data.success) {
        return res.status(500).json(data)
      }
      
      const result = await this.storageService.updateData(wallet.wallet, denom, key, value)

      return res.status(200).json({
        success: result.success,
        response: result.result.msgResponses,
        gasUsed: result.result.gasUsed.toString(),
        gasWanted: result.result.gasWanted.toString(),
        height: result.result.height.toString(),
        txHash: result.result.transactionHash,
        txIndex: result.result.txIndex,
      })
    })

    this.router.delete(`${prefix}/mnemonic/data/:denom/delete`, async (req, res) => {
      const { denom } = req.params
      const { mnemonic, key } = req.body

      const wallet = await this.walletService.walletFromMnemonic(mnemonic)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const data = await this.storageService.getStorageKey({
        denom,key
      })

      if (!data.success) {
        return res.status(500).json(data)
      }
      
      const result = await this.storageService.deleteData(wallet.wallet, denom, key)

      return res.status(200).json({
        success: result.success,
        response: result.result.msgResponses,
        gasUsed: result.result.gasUsed.toString(),
        gasWanted: result.result.gasWanted.toString(),
        height: result.result.height.toString(),
        txHash: result.result.transactionHash,
        txIndex: result.result.txIndex,
      })
    })

    this.router.delete(`${prefix}/privateKey/data/:denom/delete`, async (req, res) => {
      const { denom } = req.params
      const { privateKey, key } = req.body

      const wallet = await this.walletService.walletFromPrivateKey(privateKey)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const data = await this.storageService.getStorageKey({
        denom,key
      })

      if (!data.success) {
        return res.status(500).json(data)
      }
      
      const result = await this.storageService.deleteData(wallet.wallet, denom, key)

      return res.status(200).json({
        success: result.success,
        response: result.result.msgResponses,
        gasUsed: result.result.gasUsed.toString(),
        gasWanted: result.result.gasWanted.toString(),
        height: result.result.height.toString(),
        txHash: result.result.transactionHash,
        txIndex: result.result.txIndex,
      })
    })
  }

  public getRouter(): Router {
    return this.router;
  }
}
