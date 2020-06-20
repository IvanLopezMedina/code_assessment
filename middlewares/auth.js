const {user, admin} = require('../clients/clients.roles');

const isAdmin = async (req, res, next) => {
  if (req.headers.role === admin) next();
  else return res.status(403).send('Access denied.');
};

const isUserOrAdmin = async (req, res, next) => {
  if (req.headers.role === admin || req.headers.role === user) next();
  else return res.status(403).send('Access denied.');
};

module.exports = {isAdmin, isUserOrAdmin};
