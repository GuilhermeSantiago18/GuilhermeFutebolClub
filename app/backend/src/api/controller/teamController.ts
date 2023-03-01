import * as express from 'express';
import IServiceTeam from '../Interfaces/IServiceTeam';

export default class TeamController {
  private _service: IServiceTeam;

  constructor(service: IServiceTeam) {
    this._service = service;
  }

  async findAll(_req: express.Request, res: express.Response) {
    const result = await this._service.findAll();
    return res.status(200).json(result);
  }
}
