const { celebrate, Joi } = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);
const validator = require("validator");

const validateURL = (value, helpers) => {
  if(validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  })
});

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
});

module.exports.validateAddArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateURL),
    image: Joi.string().required().custom(validateURL),
    owner: Joi.objectId(),
  })
});

module.exports.validateDeleteArticle = celebrate({
  params: Joi.object().keys({
    articleId: Joi.objectId(),
  })
});