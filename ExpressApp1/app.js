'use strict';
var debug = require('debug')('my express app');
//const fs = require('fs');
//const https = require('https');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var sample = require('./api/sample');
var list = require('./api/list');

// .env�t�@�C��������ϐ��擾
require('dotenv').config();
console.log(`process.env.COSMOS_ACCOUNT:${process.env.COSMOS_ACCOUNT}`);
console.log(`process.env.COSMOS_DATABASE:${process.env.COSMOS_DATABASE}`);
console.log(`process.env.COSMOS_ENDPOINT:${process.env.COSMOS_ENDPOINT}`);
console.log(`process.env.COSMOS_KEY:${process.env.COSMOS_KEY}`);

var app = express();

//const options = {
//    key: fs.readFileSync('private-key.pem'),
//    cert: fs.readFileSync('certificate.pem')
//};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/sample', sample);
app.use('/list', list);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

//https.createServer(options, app).listen(3000, () => {
//    console.log('Server is listening on https://localhost:3000/');
//});
var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
