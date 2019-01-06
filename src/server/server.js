'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const mongoConnection = require('../model/createConnection');
const passport = require('passport');
const cookieSession = require('cookie-session');
const app = express();
const CONTENT_SERVER_PORT = process.env.ADAPTER_TEMPLATE_ENGINE_PORT ? process.env.ADAPTER_TEMPLATE_ENGINE_PORT : 8080
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// Has to be placed only after cors middle ware because cors has to be enabled before routing 
require('./controllers/foodcourts-controller')(app);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['encryptkey']
}))




if (CONTENT_SERVER_PORT != undefined) {
    mongoConnection.createConnection().then(() => {
        app.listen(CONTENT_SERVER_PORT, (errorMessage) => {
            if (errorMessage) {
                throw new Error(errorMessage);
            }
            else {
                console.log(`Server started listening on port ${CONTENT_SERVER_PORT} at ${new Date()}`)
            }
        })
    }).catch((ex) => {
        console.log(ex);
    })
}
else {
    console.log(`Port Number should be defined`);
    throw new Error(`Port Number should be defined`);
}