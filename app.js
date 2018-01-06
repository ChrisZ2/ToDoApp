const express = require('express');
const  path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// const index = require('./routes/index.route');
// const users = require('./routes/users.route');
// const api = require('./routes/api.route')

const bluebird = require('bluebird');


let app = express();

const mongoose = require('mongoose');
mongoose.Promise = Promise;
// language=HTML
//using latest promise feature
mongoose.connect("mongodb://zhangrz2:Zrz890612@ds135234.mlab.com:35234/chris_database", {useMongoClient: true})
    .then(()=>{
        console.log("Successfully Connected to the Mongodb Database  mlab")
    })
    .catch(() => {
        console.log("Error Connecting to the Mongodb Database at mlab")
    });

//get the api route

const api = require('./routes/api.route');





app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

//use route
//app.use('/', index);
//app.use('/users', users);

//use the api route for all routes matching /api
app.use('/api', api);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);
// app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
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