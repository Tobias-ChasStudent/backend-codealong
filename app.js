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
const {passport, setUser} = require('./utils/passport')

var app = express();


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
    secure: false
  },
  resave: false,
  secret: "keyboard cat",
  saveUninitialized: true
}))
/* app.use(flash()) */
app.use((req,res,next) => {
  if (req.session.flash && req.session.flash.length > 0) {
    res.locals.flash = req.session.flash
    delete req.session.flash
  }

  next()
})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(setUser)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeWebRouter);
app.use('/auth', loginWebRouter);



module.exports = app;