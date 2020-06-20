const {clients, policies} = require('../provider');
const {filterNameFromList, filterIdFromList} = require('../helpers');

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
  let client = [];

  data = filterIdFromList(data, req.params.id);
  if (data.length > 0) {
    client = filterIdFromList(clientList, data[0].clientId);
  }

  return res.json(client);
};

module.exports = {
  getPoliciesByUsername,
  getUserByPolicyNumber,
};
