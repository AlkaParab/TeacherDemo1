var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Middleware=require("./Middleware/Middleware");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var teacherRouter = require('./routes/teacher.routes');
let loginRouter= require('./routes/auth');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', Middleware.checkToken,usersRouter);
app.use('/auth', loginRouter);
app.use('/teach',Middleware.checkToken,teacherRouter);

module.exports = app;
