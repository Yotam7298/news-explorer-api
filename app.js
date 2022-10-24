// Libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// Middleware
const errorHandler = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require('./middleware/logger');
const pathNonExistent = require('./middleware/pathNonExistent');
// Router
const indexRouter = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;
const mongoLink = "mongodb://localhost:27017/newsexplorer";
const limiter = rateLimit({
  windowMs: 15 * 6000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

mongoose.connect(mongoLink);
require("dotenv").config();

app.use(helmet());
app.use(limiter);
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/', indexRouter);
app.use('*', pathNonExistent);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});