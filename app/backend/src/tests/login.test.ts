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

  it('Verifica se a role do usuário logado é retornada corretamente', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3MiOnsiaWQiOjEsInVzZXJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY3NDg1MDU5NCwiZXhwIjoxNjc0OTM2OTk0fQ.vU4L29SVQ277Syh5p3VbPrEsUtEOsVoz826qaEV-JL8';

    chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', token);

    expect(chaiHttpResponse.body).to.be.deep.equal({ role: 'admin' });
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Verifica se a requisição retorna uma messagem de erro quando não possui a chave authorization', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate');

    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'authorization field not found' });
    expect(chaiHttpResponse.status).to.be.equal(400);
  });
})