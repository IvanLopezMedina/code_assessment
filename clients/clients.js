const {clients} = require('../provider');
const {filterNameFromList, filterIdFromList} = require('../helpers');

const getClientById = async (req, res) => {
  let data = await clients;

  data = filterIdFromList(data, req.params.id);
  return res.json(data);
};

const getClientByName = async (req, res) => {
  let data = await clients;

  data = filterNameFromList(data, req.params.name);
  return res.json(data);
};

module.exports = {
  getClientById,
  getClientByName,
};
