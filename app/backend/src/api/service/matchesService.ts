import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/teamModel';
import MatchesModel from '../../database/models/matchesModel';
import { response, responseError } from '../utils/response';
import IResponse from '../Interfaces/IResponse';
import IUpdateMatch from '../Interfaces/IUpdateMatch';
import ICreateMatch from '../Interfaces/ICreateMatch';

export default class MatchesService {
  protected model: ModelStatic<MatchesModel> = MatchesModel;

  async getAll(inProgress: string): Promise<IResponse> {
    const resultMatches = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (!inProgress) return response(200, resultMatches);

    const progress = resultMatches.filter((match) => match.inProgress);
    const noProgressFalse = resultMatches.filter((match) => !match.inProgress);

    if (inProgress === 'true') return response(200, progress);
    if (inProgress === 'false') return response(200, noProgressFalse);

    return response(200, resultMatches);
  }

  async finishMatch(id: number): Promise<IResponse> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return response(200, { message: 'Finished' });
  }

  async updateMatch(id: number, body: IUpdateMatch): Promise<IResponse> {
    const matchToUpdate = await this.model.findByPk(id);
    if (matchToUpdate?.inProgress) {
      await this.model.update({ ...body }, { where: { id } });
    }
    return response(200, { message: 'Updated' });
  }

  async createMatch(body: ICreateMatch): Promise<IResponse> {
    if (body.homeTeamId === body.awayTeamId) {
      return responseError(
        422,
        'It is not possible to create a match with two equal teams',
      );
    }

    const homeTeam = await this.model.findByPk(body.homeTeamId);
    const awayTeam = await this.model.findByPk(body.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return responseError(404, 'There is no team with such id!');
    }

    const createMatch = await this.model.create({ ...body, inProgress: true });
    return response(201, createMatch);
  }
}
