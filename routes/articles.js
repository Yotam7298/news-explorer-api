const router = require('express').Router();
const {
  getArticles,
  addArticle,
  deleteArticle,
} = require('../controllers/articles');
const {
  validateAddArticle,
  validateDeleteArticle,
} = require('../middleware/requestValidation');

router.get('/', getArticles);
router.post('/', validateAddArticle, addArticle);
router.delete('/:articleId', validateDeleteArticle, deleteArticle);

module.exports = router;
