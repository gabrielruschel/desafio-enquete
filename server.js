// const hostname = '127.0.0.1';
// const port = 8000;

const express = require('express');
const bodyParser = require('body-parser');

const config = require('config');
const mongoose = require('mongoose');

// Carrega o modulo HTTP do Node
var http = require("http");

const app = express();

app.use(bodyParser.json())

require('./app/routes/routes.js')(app);

console.log(config);

// listen for requests
app.listen(config.Port,config.ServerHost, () => {
    console.log(`Server is listening on port ${config.Port}`);
});

mongoose.Promise = global.Promise;

//Connecting to the database
mongoose.connect(config.DBHost, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log("Could not connect to the database. Err ... ",err);
    process.exit();
});

module.exports = app; // for testing
