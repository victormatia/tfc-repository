import { stub, restore } from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
import Match from '../database/models/Match';
import { matcheModelFindAll } from './mocks/mockModels';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração para o endpoint /match', () => {
  let response: Response;

  afterEach(restore);

  it('Verifica se todos as partidas são retornadas', async () => {
    stub(Match, 'findAll').resolves(matcheModelFindAll as any);

    response = await chai.request(app).get('/matches');

    expect(response.body).to.be.deep.equal(matcheModelFindAll);
    expect(response.status).to.be.equal(200);
  });
    
});


