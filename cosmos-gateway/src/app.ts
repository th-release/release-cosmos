import * as express from 'express';
import { AppController } from './app/app.controller';
import { WalletController } from './wallet/wallet.controller';
import { StorageController } from './storage/storage.controller';

const controllers = [new AppController('/'), new WalletController('/wallet'), new StorageController("/storage")]

export default class App {
  public router: express.Application;

  constructor(app: express.Application) {
    this.router = app;
    this.controllerInit();
    this.start();
  }

  private controllerInit(): void {
    try {
      controllers.forEach((controller) => {
        const controllerRouter: express.Router = controller.getRouter();
        this.router.use('/api', controllerRouter);
      })
    } catch (err) {
      console.error('controller Init Error:' + err)
      return process.exit(1);
    }

    console.log("controller Init Success");
  }

  private start(): void {
    this.router.listen(process.env.PORT ?? 3000, () => {
      console.log(`Server is running on port: ${process.env.PORT ?? 3000}`)
    });
  }
}
