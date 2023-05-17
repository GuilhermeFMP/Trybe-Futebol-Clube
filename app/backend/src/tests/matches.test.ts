import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import IMatchAtributtes from '../interfaces/IMatchAtributtes';
import * as jwt from '../utils/token';
import { Response } from 'superagent';
import Matches from '../database/models/Match';
import mocks from './mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Router', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET /matches', () => {

    it('deve retornar o status 200 e as partidas', async () => {
      sinon.stub(Matches, 'findAll').resolves(mocks.matchesMock as Matches[])

      const response = await chai.request(app).get('/matches');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mocks.matchesMock);
    });

    it('deve retornar o status 200 e as partidas em progresso', async () => {
      sinon.stub(Matches, 'findAll').resolves(mocks.InProgressMatchesMock as Matches[])

      const response = await chai.request(app).get('/matches?inProgress=true');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mocks.InProgressMatchesMock);
    });
  });

  describe('POST /matches', () => {

    it('deve retornar o status 201 e a partida', async () => {
      sinon.stub(jwt, 'verifyToken').resolves({
        email: 'admin@admin.com',
        password: 'senha_admin'
      })
      sinon.stub(Matches, 'create').resolves(mocks.InProgressMatchesMock as Matches)

      const response = await chai.request(app).post('/matches').send(mocks.InProgressMatchesMock as object)
        .set('Authorization', 'token-valid');

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(mocks.InProgressMatchesMock);
    });

    it('deve retornar o status 422 e a mensagem', async () => {
      sinon.stub(jwt, 'verifyToken').resolves({
        email: 'admin@admin.com',
        password: 'senha_admin'
      })

      const response = await chai.request(app).post('/matches').send(mocks.wrongMatchesMock as object)
        .set('Authorization', 'token-valid');

      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({
        message: 'It is not possible to create a match with two equal teams',
      });
    });

    it('deve retornar o status 404 e a mensagem', async () => {
      sinon.stub(jwt, 'verifyToken').resolves({
        email: 'admin@admin.com',
        password: 'senha_admin'
      })

      const response = await chai.request(app).post('/matches').send(mocks.notExistMatchesMock as object)
        .set('Authorization', 'token-valid');

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({
        message: 'There is no team with such id!',
      });
    });
  });

  describe('PATCH /matches/:id/finish', () => {
    it('deve retornar o status 200', async () => {
      sinon.stub(jwt, 'verifyToken').resolves({
        email: 'admin@admin.com',
        password: 'senha_admin'
      })

      const response = await chai.request(app).patch('/matches/1/finished')
        .set('Authorization', 'token-valid');

      expect(response.status).to.be.equal(200);
    });
  });

  describe('PATCH /matches/:id', () => {
    it('deve retornar o status 200', async () => {
      sinon.stub(jwt, 'verifyToken').resolves({
        email: 'admin@admin.com',
        password: 'senha_admin'
      })

      const response = await chai.request(app).patch('/matches/1/').send({
        homeTeamGoals: 0,
        awayTeamGoals: 0,
      }).set('Authorization', 'token-valid');

      expect(response.status).to.be.equal(200);
    });
  })
});