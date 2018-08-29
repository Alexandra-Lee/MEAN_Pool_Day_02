const express = require('express');
const path = require('path');
const fs = require('fs');

var app = express();

module.exports.start = function start(port) {
    
    //Set static path to static files or resources
    app.use('/', express.static(path.join(__dirname, 'public')));

    //Set paths to the pages/views
    app.get('/index', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });
    
    app.get('/form', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/form.html'));
    })
      
    app.get('/image', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/image.html'));
    })

    app.get('/student/:number(\\d+)/', (req, res) => {
        res.end("Greetings Student Number " + req.params.number + "!");
    })    
    app.use(function (req, res, next) {
        res.status(404).send("Error 404: Page not found")
    })  

    app.listen(port, function() {
        console.log("Server started on port 3000.");
    });    
}