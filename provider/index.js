const {fetchDataFromProvider} = require('../helpers');
const {COMPANY_CLIENTS_URL, COMPANY_POLICIES_URL} = require('./enum');

const clients = fetchDataFromProvider(COMPANY_CLIENTS_URL);
const policies = fetchDataFromProvider(COMPANY_POLICIES_URL);

module.exports = {clients, policies};
