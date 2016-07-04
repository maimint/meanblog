'use strict';

require('dotenv').config({path: __dirname + '/.env'}); // require env

const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const jwt           = require("jsonwebtoken");
const app           = express();


// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Set orgin
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


//Set Public Path Dir
app.use(express.static(path.join(__dirname, 'public')));


//Routes
var back          = require('./routes/back');

//Routes mount
app.use('/back', back);




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json( {
      message: err.message,
      error: err
    });
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json( {
    message: err.message,
    error: {}
  });
});

//Port Config
/*const server    = require('http').Server(app);
const serverIp    = process.env.APP_IP || '0.0.0.0';
const serverPort  = process.env.APP_PORT || 20310;

server.listen(serverPort, serverIp);*/

app.listen(process.env.PORT || 5000, function(){
  
});

module.exports = app;
