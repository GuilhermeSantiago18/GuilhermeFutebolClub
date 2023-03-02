import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'

chai.use(chaiHttp);

const { expect } = chai;

// import TeamService from '../api/service/teamService';
import Teams from '../database/models/teamModel';
import { allTeams } from './mocks/teamsMock'

describe('Testando os verbos da rota teams', () => {
 
  afterEach(() => {
    sinon.restore()
  })

  it('Verifica se o GET traz todos os times', async () => {
    sinon.stub(Teams, "findAll").resolves(allTeams as Teams[])

    const result = await chai.request(app).get('/teams');
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(allTeams);
  });

});