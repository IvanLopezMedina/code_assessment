// Dev dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const server = require('../index');
const {clients} = require('../provider');
const {user, admin} = require('./clients.roles');

const clientId = 'a0ece5db-cd14-4f21-812f-966633e7be86';
const clientIdFake = 'c0ece5db-cd14-4f21-812f-966633e7be86';
const clientName = 'Britney';
const userHeaders = {role: user};
const adminHeaders = {role: admin};
const invalidHeaders = {role: 'invalid_role'};

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
        .set(userHeaders)
        .then(function (res) {
          assert.isTrue(res.body.length === 1);
          assert.strictEqual(res.statusCode, 200);
        });
    });
    it('Should return an empty array of clients because the id is not found', async function () {
      await chai
        .request(server)
        .get('/clients/' + clientIdFake)
        .set(userHeaders)
        .then(function (res) {
          assert.isTrue(res.body.length === 0);
          assert.strictEqual(res.statusCode, 200);
        });
    });
    it('Should return an empty array of clients because the id is invalid', async function () {
      await chai
        .request(server)
        .get('/clients/invalid_data')
        .set(userHeaders)
        .then(function (res) {
          assert.isTrue(res.body.length === 0);
          assert.strictEqual(res.statusCode, 200);
        });
    });
    it('Should return a 403 access denied because there are no role headers', async function () {
      await chai
        .request(server)
        .get('/clients/' + clientId)
        .then(function (res) {
          assert.strictEqual(res.text, 'Access denied.');
          assert.strictEqual(res.statusCode, 403);
        });
    });
    it('Should return a 403 access denied because the role is not admin or user', async function () {
      await chai
        .request(server)
        .get('/clients/' + clientId)
        .set(invalidHeaders)
        .then(function (res) {
          assert.strictEqual(res.text, 'Access denied.');
          assert.strictEqual(res.statusCode, 403);
        });
    });
  });
  describe('GET /clients/name/:name', () => {
    it('Should return a client searched by its name', async function () {
      await chai
        .request(server)
        .get('/clients/name/' + clientName)
        .set(adminHeaders)
        .then(function (res) {
          assert.isTrue(res.body.length === 1);
          assert.strictEqual(res.statusCode, 200);
        });
    });
    it('Should return an empty array of clients because the client name is not found', async function () {
      await chai
        .request(server)
        .get('/clients/name/Ivan')
        .set(adminHeaders)
        .then(function (res) {
          assert.isTrue(res.body.length === 0);
          assert.strictEqual(res.statusCode, 200);
        });
    });
    it('Should return an empty array of clients because the client name is not complete', async function () {
      await chai
        .request(server)
        .get('/clients/name/' + clientName[0])
        .set(adminHeaders)
        .then(function (res) {
          assert.isTrue(res.body.length === 0);
          assert.strictEqual(res.statusCode, 200);
        });
    });
    it('Should return a 403 access denied because there are no role headers', async function () {
      await chai
        .request(server)
        .get('/clients/name/' + clientName)
        .then(function (res) {
          assert.strictEqual(res.text, 'Access denied.');
          assert.strictEqual(res.statusCode, 403);
        });
    });
    it('Should return a 403 access denied because the role is not admin or user', async function () {
      await chai
        .request(server)
        .get('/clients/name/' + clientName)
        .set(invalidHeaders)
        .then(function (res) {
          assert.strictEqual(res.text, 'Access denied.');
          assert.strictEqual(res.statusCode, 403);
        });
    });
  });
});
