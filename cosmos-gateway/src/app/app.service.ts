import { Request, Response } from "express";

export class AppService {
  public getStatus(req: Request, res: Response): Response<any, Record<string, any>> {
    return res.status(200).send({
      status: true,
      internetProtocol: req.ip
    });
  }
}
