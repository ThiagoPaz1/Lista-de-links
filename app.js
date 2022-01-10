const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const linkRouter = require('./routers/linkRouter');
const path = require('path');
let db = mongoose.connection;

mongoose.connect('mongodb://localhost/link')

db.on('error', () => console.log('Houve um erro.'));
db.once('open', () => {console.log('Banco carregado.')});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

app.use('/', linkRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});