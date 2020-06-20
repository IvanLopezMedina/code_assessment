// Dev dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const server = require('../index');
const {clients} = require('../provider');

const clientId = 'a0ece5db-cd14-4f21-812f-966633e7be86';
const clientIdFake = 'c0ece5db-cd14-4f21-812f-966633e7be86';
const clientName = 'Britney';

chai.use(chaiHttp);
let clientList;

describe('Clients Unit Test', () => {
  before(async function () {
    clientList = await clients;
  });

  describe('GET /clients', () => {
    it('Should return an array of clients', async function () {
      await chai
        .request(server)
        .get('/clients')
        .then(function (res) {
          assert.isTrue(res.body.length > 0);
          assert.strictEqual(res.statusCode, 200);
        });
    });
  });
  describe('GET /clients/:id', () => {
    it('Should return a client searched by its id', async function () {
      await chai
        .request(server)
        .get('/clients/' + clientId)
        .then(function (res) {
          assert.isTrue(res.body.length === 1);
          assert.strictEqual(res.statusCode, 200);
        });
    });
    it('Should return an empty array of clients because the id is not found', async function () {
      await chai
        .request(server)
        .get('/clients/' + clientIdFake)
        .then(function (res) {
          assert.isTrue(res.body.length === 0);
          assert.strictEqual(res.statusCode, 200);
        });
    });
    it('Should return an empty array of clients because the id is invalid', async function () {
      await chai
        .request(server)
        .get('/clients/invalid_data')
        .then(function (res) {
          assert.isTrue(res.body.length === 0);
          assert.strictEqual(res.statusCode, 200);
        });
    });
  });
  describe('GET /clients/name/:name', () => {
    it('Should return a client searched by its name', async function () {
      await chai
        .request(server)
        .get('/clients/name/' + clientName)
        .then(function (res) {
          assert.isTrue(res.body.length === 1);
          assert.strictEqual(res.statusCode, 200);
        });
    });
    it('Should return an empty array of clients because the client name is not found', async function () {
      await chai
        .request(server)
        .get('/clients/name/Ivan')
        .then(function (res) {
          assert.isTrue(res.body.length === 0);
          assert.strictEqual(res.statusCode, 200);
        });
    });
    it('Should return an empty array of clients because the client name is not complete', async function () {
      await chai
        .request(server)
        .get('/clients/name/' + clientName[0])
        .then(function (res) {
          assert.isTrue(res.body.length === 0);
          assert.strictEqual(res.statusCode, 200);
        });
    });
  });
});
