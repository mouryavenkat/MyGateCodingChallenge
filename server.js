'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const mongoConnection = require('./modal/createConnection');
const passport = require('passport');
const cookieSession = require('cookie-session');
const session = require('express-session');
const app = express();
const CONTENT_SERVER_PORT = process.env.ADAPTER_TEMPLATE_ENGINE_PORT ? process.env.ADAPTER_TEMPLATE_ENGINE_PORT : 8080
require('./google');
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
require('./controllers/api-controller')(app);
require('./controllers/user-controller')(app);
require('./controllers/admin-controller')(app);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['encryptkey']
}))


app.get('/loginMe', passport.authenticate('google', {
    scope: ['profile', 'email']
}))
app.get('/auth/google/redirect', passport.authenticate('google'), ((req, res) => {
    
    console.log(req.session.passport);
    req.session.username=req.session.passport.user;
    res.redirect('http://localhost:3000/dashboard');
}))
app.get('/fetchUserInfo', (req, res) => {
    console.log(`Returning logged in emailId`);
    console.log(req.session);
    if (req.session && req.session.passport && req.session.passport && req.session.passport.user) {
        console.log(req.session.passport.user)
        return res.json({ user: req.session.passport.user });
    }
    return res.status(200).json({code:500,message:'No user session found'});
})

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