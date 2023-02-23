const express = require('express')
const createError = require('http-errors')
    // const cookieparser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyparser = require('body-parser')
const path = require('path')
const { config } = require('process')
require('dotenv').config()

//const indexRoutes = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');

const app = express();
app.use(cors({
    origin: function(origin, callback) {
        return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
}));

//DataBase Configuration 
require("./db/connection");

// app use
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//app.use(cookieParser());


//routes
//app.use('/', indexRoutes);
app.use('/api/admin', adminRouter);
app.use('/api/users', usersRouter);
app.use('/api/product', productRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app is live at ${PORT}`);
});