import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { createServer } from '../../server';


chai.use(chaiHttp);
const { expect } = chai;
let server;

before(async function() {
  server = await createServer();
});

describe('Todos Controller', function() {
  describe('Get Todos', function() {
    it('should return a 200 response', async function() {
      const res = await chai.request(server).get('/todos');
      expect(res.status).to.equal(200);
    });
  });

  describe('Get one todo', function() {
    it('should return a 200 response', async function() {
      const res = await chai.request(server).get('/todos/1');
      expect(res.status).to.equal(200);
    });
  });

  describe('Add todo', function() {
    let res;
    it('should return a 200 response', async function() {
      res = await chai.request(server).post('/todos').send({
        title: 'Watch Home Alone part 5.',
        description: 'Watch it while naked! EPIC!'
      });
      expect(res.status).to.equal(201);
    });

    it(`should respond with title equals to "Watch Home Alone part 5."`, function() {
      expect(res.body.title).to.equal('Watch Home Alone part 5.');
    });
  });
});
