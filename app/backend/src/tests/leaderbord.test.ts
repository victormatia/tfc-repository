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

describe('Testes de integração para o endpoint /leaderborad', () => {
  it('Verifica se é retornado um resultado com os times ranqueados', async () => {
    stub(Match, 'findAll').resolves({} as any);
    
  });
});