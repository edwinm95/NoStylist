var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')
const cookieSession = require('cookie-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRoutes = require('./routes/auth')
var bodyParser = require('body-parser')
const mongoosse = require('mongoose');
const keys = require('./config/keys')
const cors = require('cors');
const apiRoute = require('./routes/api')
require('./models/User')

mongoosse.connect(keys.mongoURI, { useNewUrlParser: true })

var app = express();

app.use(
  cookieSession(
    {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
    }
  )
)
const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
}
app.use(cors({origin: "http://localhost:3000"}));
require('./services/passport');
app.use(passport.initialize());
app.use(passport.session());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth',authRoutes)
// app.use('/api' , passport.authenticate('jwt', { session: false }),apiRoute)
app.use('/api' ,apiRoute)

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
