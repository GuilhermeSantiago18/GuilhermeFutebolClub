import { Router, Response, Request } from 'express';
import TeamController from '../controller/teamController';
import TeamService from '../service/teamService';

const teamsRouter = Router();
const teamsService = new TeamService();
const teamsController = new TeamController(teamsService);

teamsRouter.get('/teams', (request: Request, response: Response) =>
  teamsController.findAll(request, response));

export default teamsRouter;
