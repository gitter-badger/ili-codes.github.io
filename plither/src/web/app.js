var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var busboy = require('connect-busboy');
var geoip = require('geoip-lite');
var ipaddr = require('ipaddr.js');
var express = require('express');
var logger = require('morgan');
var path = require('path');
var hbs = require('hbs');
var fs = require('fs');

var gameClient = null;
var revision = "A1b2c3";

var app = express();

// view engine setup
app.setConfigs = function ( configs ) {
    gameClient = configs;
};
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//app.use(logger('dev'));

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/assets/img/favicon.png'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// emulating the folder s for graphics (to simplify the work with updates)
app.use('/s', express.static(path.join(__dirname, 'public/assets/img')));

// view static files
app.use(express.static(path.join(__dirname, 'public')));

// Web Client
app.get('/', function (req, res, next) {
    var dateIp = geoip.lookup(ipaddr.process(req.ip).toString());
    res.render('home', {
        coreConfigs: gameClient.config,
        revision: revision,
        showlayout: true,
        geo: ( dateIp ? dateIp : {"country":"NONE"} ),
        title: ''		
    });
});

// Social box
app.get('/social-box', function (req, res, next) {
    res.render('social-box');
});

// Ajax
app.get('/getservers', function (req, res, next) {
	res.send(JSON.stringify(gameClient.config.gameservers));
});

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

module.exports = app;