const {clients} = require('../provider');

const getClients = async (req, res) => {
  let data = await clients;
  return res.json(data);
};

const getClientById = async (req, res) => {
  let data = await clients;
  data = data.filter((client) => client.id === req.params.id);
  return res.json(data);
};

const getClientByName = async (req, res) => {
  let data = await clients;
  console.log(req.params.name);
  data = data.filter((client) => client.name === req.params.name);
  return res.json(data);
};

module.exports = {
  getClients,
  getClientById,
  getClientByName,
};
