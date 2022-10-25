const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 15 * 6000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
