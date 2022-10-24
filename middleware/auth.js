const jwt = require("jsonwebtoken");
const { NoAuthorizationError } = require("../errors/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization || !authorization.startsWith("Bearer ")) {
    throw new NoAuthorizationError("Authorization not provided or provided without bearer");
  }

  const token = authorization.replace("Bearer ", "");
  const { NODE_ENV, JWT_SECRET } = process.env;

  let payload;

  try {
    payload = jwt.verify(token,
      NODE_ENV === "production"
        ? JWT_SECRET
        : "secret-key");
  } catch (err) {
    throw new NoAuthorizationError("Authorization required");
  }

  req.user = payload;
  next();
};
