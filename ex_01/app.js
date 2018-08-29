const express = require("express");

var app = express();

module.exports.start = function start(port) {

    app.get('/', function(req, res){
    res.send('Greetings Traveller!');
    });

    app.listen(port, function() {
        console.log("Server started on port 3000.");
    });    
}
