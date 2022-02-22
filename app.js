var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./config/db');
var dbModel = require('./model/dbModel');

var plantsRouter = require('./routes/plants');
var fuelsRouter = require('./routes/fuels');
var generationsRouter = require('./routes/generations');
var keywordRefRouter = require('./routes/keywordRef');

var app = express();

var cors = require('cors');

// allow cross origin
app.use(cors());

// initialize database
db.initDB()
// dbModel.importCSV('./global_power_plant_database.csv')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/plants', plantsRouter);
app.use('/fuels', fuelsRouter);
app.use('/generations', generationsRouter);
app.use('/keyword', keywordRefRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
