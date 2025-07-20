import { Router } from "express";
import {StorageService} from "./storage.service";
import { WalletService } from "src/wallet/wallet.service";

export class StorageController {
  private router: Router = Router();
  private readonly storageService: StorageService = new StorageService();
  private readonly walletService: WalletService = new WalletService()

  constructor(prefix: string) {
    this.initializeRoutes(prefix);
  }

  private initializeRoutes(prefix: string): void {
    this.router.get(`${prefix}`, (req, res) => this.storageService.getStatus(req, res));
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

      return res.status(201).json(result)
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
  }

  public getRouter(): Router {
    return this.router;
  }
}
