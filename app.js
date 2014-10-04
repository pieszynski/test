
var express = require('express');

var app = module.exports = express();

app.get('/', function(req,res){
    res.send('Hello from express +1');
});

app.listen(4080, 'vps.pieszynski.com' ,function() {
    console.log('Server running at http://*:4080/');
});
