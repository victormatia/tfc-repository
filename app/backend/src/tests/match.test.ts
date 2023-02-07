import { stub, restore } from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
import Match from '../database/models/Match';
import { matcheModelFindAll } from './mocks/mockModels';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração para o endpoint /match', () => {
  let response: Response;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3MiOnsiaWQiOjEsInVzZXJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY3NTc4NjQ2MCwiZXhwIjoxNjc1ODcyODYwfQ._IW8eYfp-4dINQnOZJANdJdUltTXrLaZUI6_U4ssE7w'

  afterEach(restore);

  it('Verifica se todos as partidas são retornadas', async () => {
    stub(Match, 'findAll').resolves(matcheModelFindAll as any);

    response = await chai.request(app).get('/matches');

    expect(response.body).to.be.deep.equal(matcheModelFindAll);
    expect(response.status).to.be.equal(200);
  });

  it('Verifica se é possível adicionar uma nova partida', async () => {
    stub(Match, 'create').resolves({
      id: 49,
      homeTeamId: 16,
      awayTeamId: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true
    } as any);

    response = await chai
      .request(app)
      .post('/matches')
      .set('authorization', token)
      .send({
        "homeTeamId": 16,
        "awayTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      });

    expect(response.body).to.be.deep.equal({
      id: 49,
      homeTeamId: 16,
      awayTeamId: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true
    });

    expect(response.status).to.be.equal(201);
  });

  it('Verifica se é possível finalizar uma partida em andamento', async () => {
    stub(Match, 'update').resolves([1]);

    response = await chai.request(app).patch('/matches/49/finish').set('authorization', token);

    expect(response.body).to.be.deep.equal({ message: 'Finished' });
    expect(response.status).to.be.equal(200);
  });

  it('Verifica se não é possível finalizar uma partida finalizada', async () => {
    stub(Match, 'update').resolves([0]);

    response = await chai.request(app).patch('/matches/49/finish').set('authorization', token);

    expect(response.body).to.be.deep.equal({ message: 'the match already was finished' });
    expect(response.status).to.be.equal(200);
  });
    
});


