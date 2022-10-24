const { NotFoundError } = require("../errors/errors");

module.exports = () => {
  throw new NotFoundError("Requested page could not be found");
};
