const hostname = '127.0.0.1';
const port = 8000;

const express = require('express');
const bodyParser = require('body-parser');

const config = require('config');
const mongoose = require('mongoose');

// Carrega o modulo HTTP do Node
var http = require("http");

const app = express();

app.use(bodyParser.json())

require('./app/routes/routes.js')(app);

// listen for requests
app.listen(port,hostname, () => {
    console.log("Server is listening on port 8000");
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

// http.createServer((req,res) => {
//     if (req.url == '/' && req.method == 'GET') {
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         var json = {"message": "Olá mundo!"}
//         res.write(JSON.stringify(json));
//         res.end();
//     }
// })
// .listen(port,hostname, () => {
//     console.log("Servidor executando em http://127.0.0.1:8000/");
// })
