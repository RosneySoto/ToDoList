require('dotenv').config();
const express = require('express');
const PORT = 8080;
const bodyParser = require("body-parser");
const db = require('./db');
const routes = require('./routes/routes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');


const app = express();

app.use(express.json());

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_DATABASE
    }),
    secret: 'secreto',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 30000
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

db(process.env.MONGODB_DATABASE);




app.use('/task', routes);

app.listen(PORT, function(){
    console.log(`conectado al puerto ${PORT}`);
});