const jwt = require('jsonwebtoken');
const config = require('../config');
const { NoAuthorizationError } = require('../errors/errors');
const { authNotProvided, notAutorized } = require('../messages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization || !authorization.startsWith('Bearer ')) {
    throw new NoAuthorizationError(authNotProvided);
  }

  const token = authorization.replace('Bearer ', '');
  const { NODE_ENV, JWT_SECRET } = process.env;

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : config.jwtKey,
    );
  } catch (err) {
    throw new NoAuthorizationError(notAutorized);
  }

  req.user = payload;
  next();
};
