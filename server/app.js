var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoosse = require('mongoose');
const fileUpload = require('express-fileupload')
require('./models/User');
require('./models/Reviews');
require('./models/Items')
require('./models/Categories')
require('./models/Message')
require('./models/MessageReference')
require('./models/SubCategories')
require('./models/Types')
require('./models/Sizes')
require('./models/Designer')
require('./models/Conditions')
const passport = require('passport')
const cookieSession = require('cookie-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var designerRoutes = require('./routes/designers')
var paypalRoutes = require('./routes/paypal')
var authRoutes = require('./routes/auth')
var reviewsRoutes = require('./routes/reviews')
var CategoriesRoutes = require('./routes/categories')
var itemRoutes = require('./routes/items')
var sizesRoutes = require('./routes/sizes')
var bodyParser = require('body-parser')
const keys = require('./config/keys')
const cors = require('cors');
const apiRoute = require('./routes/api')


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
require('./services/passport');
app.use(passport.initialize());
app.use(passport.session());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth',authRoutes)
app.use('/api' ,apiRoute)
app.use('/review',reviewsRoutes)
app.use('/items',itemRoutes)
app.use('/sizes',sizesRoutes)
app.use('/paypal',paypalRoutes)
app.use('/user',usersRouter)
app.use('/categories',CategoriesRoutes)
app.use('/designers',designerRoutes)

app.use(fileUpload())
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
