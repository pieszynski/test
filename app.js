
var express = require('express');

var app = module.exports = express();

app.get('/', function(req,res){
    res.send('Hello from express +1');
});

app.use('/static', express.static(__dirname + '/static'))

app.listen(4080, function() {
    console.log('Server running at http://*:4080/');
});
