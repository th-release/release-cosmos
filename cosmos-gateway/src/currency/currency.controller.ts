import { Router } from "express";
import { CurrencyService } from "./currency.service";
import { WalletService } from "src/wallet/wallet.service";

export class CurrencyController {
  private router: Router = Router();
  private readonly currencyService: CurrencyService = new CurrencyService();
  private readonly walletService: WalletService = new WalletService()

  constructor(prefix: string) {
    this.initializeRoutes(prefix);
  }

  private initializeRoutes(prefix: string): void {
    this.router.get(`${prefix}`, (req, res) => this.currencyService.getStatus(req, res));

    this.router.get(`${prefix}/list`, async(req, res) => {
      const { offset = "0", limit = "10" } = req.query

      const result = await this.currencyService.listToken({
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
      const result = await this.currencyService.detailToken({
        denom: req.params.denon
      })

      return res.status(200).json(result)
    });

    this.router.post(`${prefix}/mnemonic/create`, async (req, res) => {
      const { mnemonic, denom, name, symbol, metadataUrl, totalSupply, decimals, initPrice } = req.body

      const wallet = await this.walletService.walletFromMnemonic(mnemonic)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const result = await this.currencyService.createToken(
        wallet.wallet, 
        denom,
        name,
        symbol,
        metadataUrl,
        totalSupply,
        decimals,
        initPrice
      )

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
      const { privatekey, denom, name, symbol, metadataUrl, totalSupply, decimals, initPrice } = req.body
      const wallet = await this.walletService.walletFromPrivateKey(privatekey)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const result = await this.currencyService.createToken(
        wallet.wallet, 
        denom,
        name,
        symbol,
        metadataUrl,
        totalSupply,
        decimals,
        initPrice
      )

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
      const { mnemonic, denom, metadataUrl, totalSupply } = req.body
      const wallet = await this.walletService.walletFromMnemonic(mnemonic)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }
      
      const data = await this.currencyService.detailToken({
        denom
      })

      if (!data.success) {
        return res.status(500).json(data)
      }

      const result = await this.currencyService.updateToken(wallet.wallet, data.data.currency, metadataUrl, totalSupply)

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
      const { privatekey, denom, metadataUrl, totalSupply } = req.body
      const wallet = await this.walletService.walletFromPrivateKey(privatekey)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const data = await this.currencyService.detailToken({
        denom
      })

      if (!data.success) {
        return res.status(500).json(data)
      }

      const result = await this.currencyService.updateToken(wallet.wallet, data.data.currency, metadataUrl, totalSupply)

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

    this.router.get(`${prefix}/amount/:denom/:address`, async (req, res) => {
      const { denom, address } = req.params

      const result = await this.currencyService.getAmount({
        denom,address
      })

      if (!result.success) {
        return res.status(500).json(result)
      }

      return res.status(200).json({
        success: result.success,
        data: result.data.amount
      })
    })

    this.router.post(`${prefix}/mnemonic/:denom/mint`, async (req, res) => {
      const { denom } = req.params
      const { mnemonic, amount, to } = req.body

      const wallet = await this.walletService.walletFromMnemonic(mnemonic)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const data = await this.currencyService.detailToken({
        denom
      })

      if (!data.success) {
        return res.status(500).json(data)
      }
      
      const result = await this.currencyService.mintToken(wallet.wallet, denom, amount, to)
      
      if (!result.success) {
        return res.status(500).json(result)
      }
      
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

    this.router.post(`${prefix}/privateKey/:denom/mint`, async (req, res) => {
      const { denom } = req.params
      const { privateKey, amount, to } = req.body

      const wallet = await this.walletService.walletFromPrivateKey(privateKey)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const data = await this.currencyService.detailToken({
        denom
      })

      if (!data.success) {
        return res.status(500).json(data)
      }
      
      const result = await this.currencyService.mintToken(wallet.wallet, denom, amount, to)

      if (!result.success) {
        return res.status(500).json(result)
      }

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

    this.router.put(`${prefix}/mnemonic/:denom/transfer`, async (req, res) => {
      const { denom } = req.params
      const { mnemonic, amount, to } = req.body

      const wallet = await this.walletService.walletFromMnemonic(mnemonic)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const data = await this.currencyService.detailToken({
        denom
      })

      if (!data.success) {
        return res.status(500).json(data)
      }

      const [w] = await wallet.wallet.getAccounts()

      const amountDetail = await this.currencyService.getAmount({
        denom,
        address: w.address
      })

      if (!amount.success) {
        return res.status(500).json(amount)
      }

      if (amount > amountDetail.data.amount) {
        return res.status(500).json({
          success: false,
          error: "There is not enough currency to transfer."
        })
      }
      
      const result = await this.currencyService.transferToken(wallet.wallet, denom, amount, to)

      if (!result.success) {
        return res.status(500).json(result)
      }

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

    this.router.put(`${prefix}/privateKey/:denom/transfer`, async (req, res) => {
      const { denom } = req.params
      const { privateKey, amount, to } = req.body

      const wallet = await this.walletService.walletFromPrivateKey(privateKey)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const data = await this.currencyService.detailToken({
        denom
      })

      if (!data.success) {
        return res.status(500).json(data)
      }

      const [w] = await wallet.wallet.getAccounts()

      const amountDetail = await this.currencyService.getAmount({
        denom,
        address: w.address
      })

      if (!amount.success) {
        return res.status(500).json(amount)
      }

      if (amount > amountDetail.data.amount) {
        return res.status(500).json({
          success: false,
          error: "There is not enough currency to transfer."
        })
      }
      
      const result = await this.currencyService.transferToken(wallet.wallet, denom, amount, to)

      if (!result.success) {
        return res.status(500).json(result)
      }

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

    this.router.delete(`${prefix}/mnemonic/:denom/burn`, async (req, res) => {
      const { denom } = req.params
      const { mnemonic, amount } = req.body

      const wallet = await this.walletService.walletFromMnemonic(mnemonic)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const data = await this.currencyService.detailToken({
        denom
      })

      if (!data.success) {
        return res.status(500).json(data)
      }

      const [w] = await wallet.wallet.getAccounts()

      const amountDetail = await this.currencyService.getAmount({
        denom,
        address: w.address
      })

      if (!amount.success) {
        return res.status(500).json(amount)
      }

      if (amount > amountDetail.data.amount) {
        return res.status(500).json({
          success: false,
          error: "There is not enough currency to transfer."
        })
      }
      
      const result = await this.currencyService.burnToken(wallet.wallet, denom, amount)

      if (!result.success) {
        return res.status(500).json({
          success: false,
          error: result.error
        })
      }

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

    this.router.delete(`${prefix}/privateKey/:denom/burn`, async (req, res) => {
      const { denom } = req.params
      const { privateKey, amount } = req.body

      const wallet = await this.walletService.walletFromPrivateKey(privateKey)

      if (!wallet.success) {
        return res.status(500).json(wallet)
      }

      const data = await this.currencyService.detailToken({
        denom
      })

      if (!data.success) {
        return res.status(500).json(data)
      }

      const [w] = await wallet.wallet.getAccounts()

      const amountDetail = await this.currencyService.getAmount({
        denom,
        address: w.address
      })

      if (!amount.success) {
        return res.status(500).json(amount)
      }

      if (amount > amountDetail.data.amount) {
        return res.status(500).json({
          success: false,
          error: "There is not enough currency to transfer."
        })
      }
      
      const result = await this.currencyService.burnToken(wallet.wallet, denom, amount)

      if (!result.success) {
        return res.status(500).json({
          success: false,
          error: result.error
        })
      }

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
