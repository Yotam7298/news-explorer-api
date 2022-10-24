// Libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
const { PORT = 3000 } = process.env;
const mongoLink = "mongodb://localhost:27017/newsexplorer"

mongoose.connect(mongoLink);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});