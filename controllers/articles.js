const Article = require('../models/article');
const { NotFoundError, UnauthorizedError } = require('../errors/errors');

module.exports.getArticles = (req, res, next) => {
  const owner = req.user._id;

  Article.find({ owner })
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports.addArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.status(201).send(article))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then((article) => {
      if(!article) {
        return Promise.reject(new NotFoundError('Requested article could not be found'));
      }
      if(article.owner.toString() !== req.user._id) {
        return Promise.reject(new UnauthorizedError('You are not authorized to do that'));
      }
      Article.findByIdAndDelete(req.params.articleId)
        .then(() => res.send('Article removed successfully'))
        .catch(next);
    })
    .catch(next);
};
