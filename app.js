// Libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
// Middleware
const errorHandler = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require('./middleware/logger');
const pathNonExistent = require('./middleware/pathNonExistent');
const rateLimiter = require('./middleware/rateLimiter');
// Router
const indexRouter = require('./routes/index');
// Config
const config = require('./config');

require('dotenv').config();

const app = express();
const {
  PORT = 3000,
  NODE_ENV = 'development',
  MONGO_URL = config.mongoUrl,
} = process.env;

mongoose.connect(MONGO_URL);

app.use(helmet());
app.use(rateLimiter);
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/', indexRouter);
app.use('*', pathNonExistent);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at port ${PORT}, Node Enviroment: ${NODE_ENV}`);
});
