const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { NoAuthorizationError, ConflictError } = require('../errors/errors');

module.exports.signUp = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((user) => {
      if(user) {
        return Promise.reject(new ConflictError("There is already a user with that email"));
      }
    })
    .then(() => bcrypt.hash(password, 10))
    .then((hash) =>
      User.create({ email, password: hash, name })
    )
    .then(({ email, name }) => {
      res.send({ email, name });
    })
    .catch(next);
};

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if(!user) {
        return Promise.reject(new NoAuthorizationError("Incorrect password or email"))
      }
      bcrypt.compare(password, user.password)
        .then((match) => {
          if(!match) {
            return Promise.reject(new NoAuthorizationError("Incorrect password or email"))
          }

          const { NODE_ENV, JWT_SECRET } = process.env;
          const token = jwt.sign(
            { _id: user._id.toString() },
            NODE_ENV === 'production'
              ? JWT_SECRET
              : 'secret-key',
            { expiresIn: '7d' }
          );
          res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
}