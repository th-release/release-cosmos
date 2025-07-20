import { Router } from "express";
import {AppService} from "./app.service";

export class AppController {
  private router: Router = Router();
  private readonly appService: AppService = new AppService();

  constructor(prefix: string) {
    this.initializeRoutes(prefix);
  }

  private initializeRoutes(prefix: string): void {
    this.router.get(`${prefix}`, (req, res) => this.appService.getStatus(req, res));
  }

  public getRouter(): Router {
    return this.router;
  }
}
