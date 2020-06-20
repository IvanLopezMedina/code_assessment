const {clients, policies} = require('../provider');
const {filterNameFromList, filterIdFromList} = require('../helpers');

const getPolicies = async (req, res) => {
  let data = await policies;
  return res.json(data);
};

const getPoliciesByUsername = async (req, res) => {
  let data = await policies;
  let clientList = await clients;

  const client = await filterNameFromList(clientList, req.params.name);
  if (client.length > 0)
    data = data.filter((policy) => policy.clientId === client[0].id);
  else data = [];

  return res.json(data);
};

const getUserByPolicyNumber = async (req, res) => {
  let data = await policies;
  let clientList = await clients;

  data = filterIdFromList(data, req.params.id);
  const client = filterIdFromList(clientList, data[0].clientId);

  return res.json(client);
};

module.exports = {
  getPolicies,
  getPoliciesByUsername,
  getUserByPolicyNumber,
};
