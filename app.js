
var express = require('express');

var app = module.exports = express();

app.use(/^\/api\//i, function(req,res){
    res.send('Hello API');
})

app.get('/', function(req,res){
    res.send('Hello from express +1');
});

app.listen(4080, function() {
    console.log('Server running at http://*:4080/');
});
