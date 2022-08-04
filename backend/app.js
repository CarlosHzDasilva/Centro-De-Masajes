const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const reservasRouter = require('./routes/reservas');
const usuariosRouter = require('./routes/usuarios');
const tratamientosRouter = require('./routes/tratamientos');
const loginRouter = require('./routes/login')

const app = express();
let mongoDB = '<MONGO DB ATLAS HERE>';

mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose:Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'no se ha podido contactar con MongoDB Atlas'));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tratamientos', tratamientosRouter);
app.use('/reservas', reservasRouter);
app.use('/usuarios', usuariosRouter);
app.use('/login', loginRouter);

module.exports = app;
