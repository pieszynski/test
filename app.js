
var express = require('express');

var app = module.exports = express();


app.use(express.static(__dirname + '/static'));

/*app.get('/', function(req,res){
    res.send('Hello from express +1');
});*/

app.listen(4080, function() {
    console.log('Server running at http://*:4080/');
});
