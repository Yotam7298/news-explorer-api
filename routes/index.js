const router = require('express').Router();
const auth = require('../middleware/auth');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { signUp, signIn } = require('../controllers/users');
const { validateSignUp, validateSignIn } = require('../middleware/requestValidation');

router.use('/users', auth, usersRouter);
router.use('/articles', auth, articlesRouter);
router.post('/signup', validateSignUp, signUp);
router.post('/signin', validateSignIn, signIn);

module.exports = router;
