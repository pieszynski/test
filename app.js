
var compression = require('compression')
var express = require('express');

var app = module.exports = express();
var router = express.Router();

app.use(compression());

app.use(express.static(__dirname + '/app'));
app.use('/bootstrap', express.static(__dirname + '/bower_components/bootstrap/dist'));
app.use('/angular', express.static(__dirname + '/bower_components/angular'));
app.use('/jquery', express.static(__dirname + '/bower_components/jquery/dist'));

app.get(/.*/i, function(req,res){
    //res.send('<h1>Hello from express +1</h1><div><img src="/img/PIA.jpg"/></div>');
    res.redirect('/error/#404');
});

app.listen(4080, function() {
    console.log('Server running at http://*:4080/');
});
