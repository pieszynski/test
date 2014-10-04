
var compression = require('compression')
var express = require('express');

var app = module.exports = express();

app.use(compression());

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req,res){
    res.send('<h1>Hello from express +1</h1><div><img src="/static/PIA.jpg"/></div>');
});

app.listen(4080, function() {
    console.log('Server running at http://*:4080/');
});
