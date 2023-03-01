import { ModelStatic } from 'sequelize';
import Teams from '../models/teamModel';

export default class TeamService {
  protected model: ModelStatic<Teams> = Teams;

  async findAll(): Promise<Teams[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}
