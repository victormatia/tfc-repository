import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
import User from '../database/models/User';
import userModelFindOne from './mocks/mockModels';


chai.use(chaiHttp)

const { expect } = chai;

describe('Testes de integração para o endpoit /login', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('Verifica se o token é retornado', async () => {
    sinon.stub(User, 'findOne').resolves(userModelFindOne as any);

    chaiHttpResponse = await chai.request(app).post('/login').send(
      {
        "email": "admin@admin.com",
        "password": "secret_admin"
      }
    );
    
    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
})