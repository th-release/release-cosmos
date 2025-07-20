import { Router } from "express";
import { WalletService } from "./wallet.service";

export class WalletController {
  private router: Router = Router();
  private readonly walletService: WalletService = new WalletService();

  constructor(prefix: string) {
    this.initializeRoutes(prefix);
  }

  private initializeRoutes(prefix: string): void {
    this.router.get(`${prefix}`, (req, res) => this.walletService.getStatus(req, res));

    this.router.get(`${prefix}/balance/:address`, async (req, res) => {
      const balance = await this.walletService.getBalance(req.params.address)

      if (!balance.success)
        return res.status(500).json(balance)

      return res.status(200).json(balance)
    });

    this.router.post(`${prefix}/privatekey/create`, async (req, res) => {
      const wallet = await this.walletService.createPrivateKeyWallet();

      if (!wallet.success)
        return res.status(500).json(wallet)

      return res.status(201).json(wallet)
    });
    
    this.router.post(`${prefix}/mnemonic/create`, async (req, res) => {
      const wallet = await this.walletService.createMnemonicWallet();

      if (!wallet.success)
        return res.status(500).json(wallet)

      return res.status(201).json(wallet)
    });

    this.router.post(`${prefix}/mnemonic/restore`, async (req, res) => {
      const { mnemonic } = req.body

      const wallet = await this.walletService.restoreMnemonicWallet(mnemonic)

      if (!wallet.success)
        return res.status(500).json(wallet)
      
      return res.status(200).json(wallet)
    });

    this.router.post(`${prefix}/privatekey/restore`, async (req, res) => {
      const { privatekey } = req.body

      const wallet = await this.walletService.restorePrivateKeyWallet(privatekey)

      if (!wallet.success)
        return res.status(500).json(wallet)
      
      return res.status(200).json(wallet)
    });

    this.router.post(`${prefix}/mnemonic/send`, async (req, res) => {
      const { mnemonic, toAddress, amount, memo = '', denom = process.env.DENOM } = req.body;

      if (!mnemonic || !toAddress || !amount) {
        return res.status(400).json({
          success: false,
          error: 'mnemonic, toAddress, and amount are required'
        });
      }

      const result = await this.walletService.sendWithMnemonic(mnemonic, toAddress, amount, memo, denom)

      if (!result.success) 
        return res.status(500).json(result)

      return res.status(200).json(result)
    });

    this.router.post(`${prefix}/privatekey/send`, async (req, res) => {
      const { privateKey, toAddress, amount, memo = '', denom = process.env.DENOM } = req.body;

      if (!privateKey || !toAddress || !amount) {
        return res.status(400).json({
          success: false,
          error: 'privateKey, toAddress, and amount are required'
        });
      }

      const result = await this.walletService.sendWithPrivateKey(privateKey, toAddress, amount, memo, denom)

      if (!result.success) 
        return res.status(500).json(result)

      return res.status(200).json(result)
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}
