import { Request, Response } from 'express';
import LeaderboardService from '../service/leaderBoardService';

export default class leaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async getAllHome(_req: Request, res: Response) {
    const result = await this.leaderboardService.getLeaderBoardHome();
    res.status(200).json(result);
  }

  async getAllAway(_req: Request, res: Response) {
    const result = await this.leaderboardService.getLeaderBoardAway();
    res.status(200).json(result);
  }

  async getAll(_req: Request, res: Response) {
    const result = await this.leaderboardService.getLeaderBoardAll();
    res.status(200).json(result);
  }
}
