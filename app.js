/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();
console.log(process.env.JWT_SECRET);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(cookieParser());
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));


app.listen(PORT);
