// Libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
// Middleware
const errorHandler = require('./middleware/errorHandler');
// Router
const indexRouter = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;
const mongoLink = "mongodb://localhost:27017/newsexplorer"

mongoose.connect(mongoLink);

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', indexRouter)
app.use(errors());
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});