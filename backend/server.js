require('dotenv').config();
const express = require('express');
const PORT = 8080;
const bodyParser = require("body-parser");
const db = require('./db');
const routes = require('./routes/routes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { engine } = require('express-handlebars');
const cors = require('cors');
const cookieParser = require('cookie-parser');

db(process.env.MONGODB_DATABASE);

const app = express();

// se le indica al backend que url del front se permite
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_DATABASE,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }),
    secret: 'secreto',
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },
    rolling: true,
    resave: true,
    saveUninitialized: true,
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes);

app.get('/', (req, res) => {
    res.send({
        users: []
    });
});

app.listen(PORT, function(){
    console.log(`conectado al puerto ${PORT}`);
});
