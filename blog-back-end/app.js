const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const { setCors } = require("./middleware/security");

const app = express();

/** SETTING UP LOWDB */
const adapter = new FileSync('data/db.json');
const db = low(adapter);
db.defaults({ posts:[] }).write();

app.use(logger('dev'));

app.use(setCors);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.use((err, req, res, next) => {
  //respond to the requestor with the error message
  //set response status to 500
res.status(500).send({
  error: {
    message: err.message,
  },
});
});

module.exports = app;
