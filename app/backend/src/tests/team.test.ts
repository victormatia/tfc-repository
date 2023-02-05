import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
import Team from '../database/models/Team';
import { teamModelFindAll } from './mocks/mockModels';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração para o endpoint /team', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('Verifica se todos os times são retornados', async () => {
    sinon.stub(Team, 'findAll').resolves(teamModelFindAll as any);

    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.body).to.be.deep.equal(teamModelFindAll);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Verifica se apenas um time é retornado quando o id é passado', async () => {
    sinon.stub(Team, 'findOne').resolves(teamModelFindAll[15] as any);

    chaiHttpResponse = await chai.request(app).get('/teams/16');

    expect(chaiHttpResponse.body).to.be.deep.equal(teamModelFindAll[15]);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});