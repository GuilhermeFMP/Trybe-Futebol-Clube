import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Teams from '../database/models/Teams';
import { ITeam } from '../interfaces/ITeam';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Router', () => {
  afterEach(() => {
    sinon.restore();
  })
  describe('GET /teams', () => {
    it('Deve retornar o status 200 e os times', async () => {
      sinon.stub(Teams,'findAll').resolves([
        {
          id: 1,
          teamName:"Avai/Kinderman"
        },
        ] as Teams[]);

      const response = await chai.request(app).get('/teams')

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal([
        {
          id: 1,
          teamName:"Avai/Kinderman"
        },
        ]);
    });
  });
  describe('GET /teams/:id', () => {
    it('Deve retornar o status 200 e o time', async () => {
      sinon.stub(Teams, 'findOne').resolves({
        id: 1,
        teamName: "Avai/Kinderman"
      } as Teams);

      const response = await chai.request(app).get('/teams/1');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(
        {
          id: 1,
          teamName:"Avai/Kinderman"
        },
        );
    })
  });
})