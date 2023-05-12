import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/Users';
import { IUser } from '../interfaces/IUser';
import { generateToken } from '../utils/token';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Router', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('POST /login', () => {
    
    it('Deve retornar o status 400 e a mensagem de erro', async () => {
      const response = await chai.request(app).post('/login').send({
        password: 'aaaaaaaaa',
      })

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({
        message: 'All fields must be filled'
      });
    });

    it('Deve retornar o status 400 e a mensagem de erro', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'aaaaaaaaa',
      })

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({
        message: 'All fields must be filled'
      });
    });

    it('Deve retornar o status 401 e a mensagem de erro', async () => {
      sinon.stub(UserModel, 'findOne').resolves(undefined);
      
      const response = await chai.request(app).post('/login').send({
        email: 'admin@admin',
        password: 'aaaaa',
      })

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({
        message: 'Invalid email or password',
      });
    });

    it('Deve retornar o status 401 e a mensagem de erro', async () => {
      sinon.stub(UserModel, 'findOne').resolves({
        id: 1,
        username: 'kuro',
        role: 'admin',
        email: 'kuro@kuro.com',
        password: 'kuro123',
      } as UserModel);
      
      const response = await chai.request(app).post('/login').send({
        email: 'kuro@kuro.com',
        password: 'aaaaaaaaa',
      })

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({
        message: 'Invalid email or password',
      });
    });

    it('Deve retornar o status 200 e o token', async () => {
      sinon.stub(UserModel, 'findOne').resolves({
        id: 1,
        username: 'kuro',
        role: 'admin',
        email: 'kuro@kuro.com',
        password: 'kuro123',
      } as UserModel);
      
      const response = await chai.request(app).post('/login').send({
        email: 'kuro@kuro.com',
        password: 'kuro123',
      })

      expect(response.status).to.be.equal(401);
      expect(response.body.token).not.to.be.empty;
    });
  });
});