// Dev dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const server = require('../index');
const {user, admin} = require('../clients/clients.roles');

const clientName = 'Britney';
const clientNameFake = 'c0ece5db';
const policyId = '7b624ed3-00d5-4c1b-9ab8-c265067ef58b';
const policyIdFake = '7z624ed3-00d5-4c1b-9ab8-c265067ef58b';
const userHeaders = {role: user};
const adminHeaders = {role: admin};

chai.use(chaiHttp);

describe('Policies Unit Test', () => {
  describe('GET /policies', () => {
    it('Should return an array of policies', async function () {
      await chai
        .request(server)
        .get('/policies')
        .then(function (res) {
          assert.isTrue(res.body.length > 0);
          assert.strictEqual(res.statusCode, 200);
        });
    });
  });
  describe('GET /policies/name/:clientName', () => {
    it('Should return a list of policies linked to a username', async function () {
      await chai
        .request(server)
        .get('/policies/name/' + clientName)
        .set(adminHeaders)
        .then(function (res) {
          assert.isTrue(res.body.length > 0);
          assert.strictEqual(res.statusCode, 200);
        });
    });
    it('Should return an empty array of clients because the username is not found', async function () {
      await chai
        .request(server)
        .get('/policies/name/' + clientNameFake)
        .set(adminHeaders)
        .then(function (res) {
          assert.isTrue(res.body.length === 0);
          assert.strictEqual(res.statusCode, 200);
        });
    });
    it('Should return a 403 access denied because there are no role headers', async function () {
      await chai
        .request(server)
        .get('/policies/name/' + clientName)
        .then(function (res) {
          assert.strictEqual(res.text, 'Access denied.');
          assert.strictEqual(res.statusCode, 403);
        });
    });
    it('Should return a 403 access denied because the role is not admin', async function () {
      await chai
        .request(server)
        .get('/policies/name/' + clientName)
        .set(userHeaders)
        .then(function (res) {
          assert.strictEqual(res.text, 'Access denied.');
          assert.strictEqual(res.statusCode, 403);
        });
    });
  });
  describe('GET /policies/:id', () => {
    it('Should return a user linked to a policy number', async function () {
      await chai
        .request(server)
        .get('/policies/' + policyId)
        .set(adminHeaders)
        .then(function (res) {
          assert.isTrue(res.body[0].name === clientName);
          assert.strictEqual(res.statusCode, 200);
        });
    });
    it('Should return an empty user because the policyId was not found', async function () {
      await chai
        .request(server)
        .get('/policies/' + policyIdFake)
        .set(adminHeaders)
        .then(function (res) {
          assert.isTrue(res.body.length === 0);
          assert.strictEqual(res.statusCode, 200);
        });
    });
    it('Should return a 403 access denied because there are no role headers', async function () {
      await chai
        .request(server)
        .get('/policies/' + policyId)
        .then(function (res) {
          assert.strictEqual(res.text, 'Access denied.');
          assert.strictEqual(res.statusCode, 403);
        });
    });
    it('Should return a 403 access denied because the role is not admin', async function () {
      await chai
        .request(server)
        .get('/policies/' + policyIdFake)
        .set(userHeaders)
        .then(function (res) {
          assert.strictEqual(res.text, 'Access denied.');
          assert.strictEqual(res.statusCode, 403);
        });
    });
  });
});
