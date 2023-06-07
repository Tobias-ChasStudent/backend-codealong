require('dotenv').config()
require('./config/mongoose')
require('./config/sequelize')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require("express-handlebars")
const flash = require('express-flash')
const session = require('express-session')

var app = express();
app.use((req,res,next) => {
  app.locals.success = req.flash('info')
  next()
})

var homeWebRouter = require('./routes/web/home-web-router');
const loginWebRouter = require('./routes/web/auth-web-router');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine("hbs", exphbs.engine({
  defaultLayout: "main",
  extname: ".hbs"
}))

app.use(cookieParser());
app.use(session({
  cookie: {
    secure: true
  },
  resave: false,
  secret: "keyboard cat",
  saveUninitialized: true
}))
app.use(flash())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeWebRouter);
app.use('/login', loginWebRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next, err) {
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
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;