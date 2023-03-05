import { Request, Response, Router } from 'express';
import tokenMiddleware from '../middleware/tokenMiddleware';
import MatchesController from '../controller/matchesController';

const matchController = new MatchesController();

const matchRouter = Router();

matchRouter.get('/matches', (req: Request, res: Response) =>
  matchController.getAll(req, res));

matchRouter.post('/matches', tokenMiddleware, (req: Request, res: Response) =>
  matchController.createMatch(req, res));

matchRouter.patch(
  '/matches/:id/finish',
  tokenMiddleware,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

matchRouter.patch(
  '/matches/:id',
  tokenMiddleware,
  (req: Request, res: Response) => matchController.updatedMatch(req, res),
);

export default matchRouter;
