//var http = require('http');
var express = require('express');

var app = module.exports = express();

/*http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('Can i haz app.js host another one or probably?');
}).listen(4080);*/

app.get('/', function(req,res){
    res.send('Hello from express');
});

app.listen(4000, function() {
    console.log('srv OK.');
});
console.log('Server running at http://*:4080/');
