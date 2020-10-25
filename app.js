var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var session = require('express-session') 
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usuarioRoutes');
var produtosRouter = require('./routes/produtosRoutes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret:'Crud-Express',
  resave: true,
  saveUninitialized: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

const options = {
  definition:{
    info:{
      title: 'API de produtos',
      version: '1.0.0',
      description: 'Descrição da API que gerencia o cadastro de produtos e usuarios.'
    }
  },
  apis: ['routes/produtosRoutes.js']
}

const swaggerSpec = swaggerJSDoc(options)

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))



app.use('/', indexRouter);
app.use('/usuario', usersRouter);
app.use('/produto', produtosRouter);


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
