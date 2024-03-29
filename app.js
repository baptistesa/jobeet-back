var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cvRouter = require('./routes/cv');
var entreprisesRouter = require('./routes/entreprises');
var offresRouter = require("./routes/offres");
var formationsRouter = require('./routes/formations');
var experienceRouter = require('./routes/experience');
var competenceRouter = require('./routes/competences');
var matchsRouter = require('./routes/matchs')
var messagesRouter = require('./routes/messages')
var jwt = require("./queries/jwt");

var app = express();
var cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cv', cvRouter);
app.use('/entreprises', entreprisesRouter);
app.use('/offres', offresRouter);
app.use('/formations', formationsRouter);
app.use('/experience', experienceRouter);
app.use('/competences', competenceRouter);
app.use('/matchs', matchsRouter);
app.use('/messages', messagesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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
