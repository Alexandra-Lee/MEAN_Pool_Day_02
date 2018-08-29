const express = require('express');
const path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser')

var app = express();

module.exports.start = function start(port) {
    app.use(cookieParser())
    //Set static path to static files or resources
    app.use('/', express.static(path.join(__dirname, 'public')));
    //Set up EJS for templating
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    //Set paths to the pages/views
    app.get('/index', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });
    
    app.get('/form', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/form.html'));
    });
      
    app.get('/image', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/image.html'));
    });

    app.get('/student/:number(\\d+)/', (req, res) => {
        res.cookie('number', req.params.number);
        res.cookie('name', req.query.name);
        if (req.cookies['name']) {
            res.render('student.ejs', {number: req.params.number, name: req.query.name});
        } 
        else
            res.render('student.ejs', {number: req.params.number});   
    }); 

    app.get('/memory', (req, res) => {
        console.log(req.cookies['name']);
        if (req.cookies['name'] != 'undefined'){
            res.send(req.cookies['name'] + ", student number " + req.cookies['number'] + " was here");
        } 
        else {
            res.send("student number " + req.cookies['number'] + " was here");
        }    
    });   

    app.use(function (req, res, next) {
        res.status(404).send("Error 404: Page not found")
    });  

    app.listen(port, function() {
        console.log("Server started on port 3000.");
    });    
}