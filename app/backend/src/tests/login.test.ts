import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/Users';
import { IUser } from '../interfaces/IUser';
import * as jwt from '../utils/token';
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
        username: 'admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: 'senha_admin',
      } as UserModel);
      
      const response = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'aaaaaaaaa',
      })

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({
        message: 'Invalid email or password',
      });
    });

    it('Deve retornar o status 200 e o token', async () => {
      sinon.stub(jwt, 'generateToken').returns('token');
      sinon.stub(UserModel, 'findOne').resolves({
        id: 1,
        username: 'admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: 'senha_admin',
      } as UserModel);
      
      const response = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'senha_admin',
      })

      expect(response.body.token).not.to.be.equal('token');
    });
  });

  describe('GET /login/role', () => {
    it('Deve retornar o status 401 e a mensagem sem um token', async () => {
      const response = await chai.request(app).get('/login/role');

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({
        message: 'Token not found',
      });
    });

    it('Deve retornar o status 401 e a mensagem com token invalido', async () => {
      const response = await chai.request(app).get('./login/role').set('Authorization', 'token-invalid');

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({
        message: 'Token must be a valid token',
      });
    });

    it('Deve retornar o status 200 e a mensagem com token valido', async () => {
      sinon.stub(jwt, 'verifyToken').returns({
        email: 'kuro@kuro.com',
        password: 'kuro123',
      });
      sinon.stub(UserModel, 'findOne').resolves({
        id: 1,
        username: 'kuro',
        role: 'admin',
        email: 'kuro@kuro.com',
        password: 'kuro123',
      } as UserModel);

      const response = await chai.request(app).get('./login/role').set('Authorization', 'token-valid');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({
        role: 'admin',
      });
    });
  });
});