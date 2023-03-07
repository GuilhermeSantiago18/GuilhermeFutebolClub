import { Request, Response, Router } from 'express';
import LeaderboardController from '../controller/leaderBoarderController';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get('/leaderboard/home', (req: Request, res: Response) =>
  leaderboardController.getAllHome(req, res));

leaderboardRouter.get('/leaderboard/away', (req: Request, res: Response) =>
  leaderboardController.getAllAway(req, res));

leaderboardRouter.get('/leaderboard', (req: Request, res: Response) =>
  leaderboardController.getAll(req, res));

export default leaderboardRouter;
