const router = require('express').Router();
const auth = require('../middleware/auth');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { signUp, signIn } = require('../controllers/users');

router.use('/users', auth, usersRouter);
router.use('/articles', auth, articlesRouter);
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;