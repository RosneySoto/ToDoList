require('dotenv').config();
const express = require('express');
const PORT = 8080;
const bodyParser = require("body-parser");
const db = require('./db');
const routes = require('./routes/routes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { engine } = require('express-handlebars');

db(process.env.MONGODB_DATABASE);

const app = express();

app.use(express.json());

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_DATABASE,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }),
    secret: 'secreto',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },
    rolling: true,
    resave: true,
    saveUninitialized: true,
}));

app.engine(
    'hbs',
    engine({
      extname: '.hbs',
      defaultLayout: 'index.hbs',
      layoutsDir: __dirname + '/public/views',
    })
);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('views', './public/views');
app.set('view engine', 'hbs');

app.use('/', routes);

app.listen(PORT, function(){
    console.log(`conectado al puerto ${PORT}`);
});