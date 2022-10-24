const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;
const mongoLink = "mongodb://localhost:27017/newsexplorer"

mongoose.connect(mongoLink);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});