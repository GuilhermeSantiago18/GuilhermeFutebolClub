import * as express from 'express';
import IServiceTeam from '../Interfaces/IServiceTeam';

export default class TeamController {
  private _service: IServiceTeam;

  constructor(service: IServiceTeam) {
    this._service = service;
  }

  async findAll(_req: express.Request, res: express.Response) {
    const allTeams = await this._service.findAll();
    return res.status(200).json(allTeams);
  }

  async findByPk(_req: express.Request, res: express.Response) {
    const { id } = _req.params;
    const teamById = await this._service.findByPk(+id);
    if (!teamById) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(teamById);
  }
}
