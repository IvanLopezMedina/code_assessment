const {user, admin} = require('../clients/clients.roles');

const isUser = async (req, res, next) => {
  if (req.headers.role === user) next();
  else return res.status(403).send('Access denied.');
};

const isAdmin = async (req, res, next) => {
  if (req.body.role === admin) next();
  return res.status(403).send('Access denied.');
};

module.exports = {isUser, isAdmin};
