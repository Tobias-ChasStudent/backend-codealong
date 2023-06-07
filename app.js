require('dotenv').config()
require('./config/mongoose')
require('./config/sequelize')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require("express-handlebars")

var homeWebRouter = require('./routes/web/home-web-router');
const authWebRouter = require('./routes/web/auth-web-router');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine("hbs", exphbs.engine({
  defaultLayout: "main",
  extname: ".hbs"
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeWebRouter);
app.use('/auth', authWebRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next, err) {
  // Handle rendering errors separately
  if (err.message && err.message.includes("Rendering error")) {
    res.status(500).send("Error rendering template");
  } else {
    // Set locals and render the error page
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  };
  next(createError(404));
})
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
