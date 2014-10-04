
var express = require('express');

var app = module.exports = express();

//app.use(express.compress());

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req,res){
    res.send('Hello from express +1\n<img src="/static/PIA.jpg"/>');
});

app.listen(4080, function() {
    console.log('Server running at http://*:4080/');
});
