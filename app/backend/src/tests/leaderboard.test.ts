import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Match';
import { Response } from 'superagent';
import * as jwt from '../utils/token';
import mocks from './mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard Router', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET /leaderboard/home', () => {
    it('Deve retornar 200', async () => {
      sinon.stub(Teams, 'findAll').resolves([{
        "id": 1,
        "teamName": "Avaí/Kindermann"
      }] as Teams[]);
      sinon.stub(Matches, 'findAll').resolves([{
        "id": 1,
        "homeTeamId": 1,
        "homeTeamGoals": 5,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
      }] as Matches[]);

      const response = await chai.request(app).get('/leaderboard/home');

      expect(response.status).to.be.equal(200);
    })
  });

  describe('GET /leaderboard/away', () => {
    it('Deve retornar 200', async () => {
      sinon.stub(Teams, 'findAll').resolves([{
        "id": 1,
        "teamName": "Avaí/Kindermann"
      }] as Teams[]);
      sinon.stub(Matches, 'findAll').resolves([{
        "id": 1,
        "homeTeamId": 8,
        "homeTeamGoals": 5,
        "awayTeamId": 1,
        "awayTeamGoals": 1,
        "inProgress": false,
      }] as Matches[]);

      const response = await chai.request(app).get('/leaderboard/away');

      expect(response.status).to.be.equal(200);
    })
  });
});