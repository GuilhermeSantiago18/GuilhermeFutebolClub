import { Router, Response, Request } from 'express';
import TeamController from '../controller/teamController';
import TeamService from '../service/teamService';

const router = Router();
const teamsService = new TeamService();
const teamsController = new TeamController(teamsService);

router.get('/teams', (request: Request, response: Response) =>
  teamsController.findAll(request, response));

export default router;
