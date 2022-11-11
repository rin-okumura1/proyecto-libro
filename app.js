var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter   = require('./routes/index');
var penaltyRouter = require('./routes/penalty');
var booksRouter   = require('./routes/books');
var authorsRouter = require('./routes/authors');
var authorsRouter = require('./routes/authors');
var lenguagesRouter = require('./routes/lenguages');
var categoriesRouter = require('./routes/categories');
var exchangeRouter = require('./routes/exchange');
var rentalRouter = require('./routes/rental');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/categories', categoriesRouter);
app.use('/lenguages', lenguagesRouter);
app.use('/penalty', penaltyRouter);
app.use('/exchange', exchangeRouter);
app.use('/rental', rentalRouter);

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