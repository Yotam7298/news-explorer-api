const { NotFoundError } = require('../errors/errors');
const { pageNotFound } = require('../messages');

module.exports = () => {
  throw new NotFoundError(pageNotFound);
};
