
var compression = require('compression')
var express = require('express');
var router = express.Router();
var htmlViews = require('./htmlViews');

var app = module.exports = express();

app.set('views', './app/views');
app.set('view engine', 'zz');

app.engine('zz', htmlViews.engine);

app.use(compression());

app.use(express.static(__dirname + '/app'));
app.use('/bootstrap', express.static(__dirname + '/bower_components/bootstrap/dist'));
app.use('/angular', express.static(__dirname + '/bower_components/angular'));
app.use('/jquery', express.static(__dirname + '/bower_components/jquery/dist'));

router.param('topic', function(req, res, next, topic) {
    req.site = req.site || {};
    req.site.topic = topic;

    next();
});

router.get('/:topic', function(req, res, next) {
    res.render('o', req.site);
});

app.get('/:topic', router);


app.get(/.*/i, function(req,res){
    //res.send('<h1>Hello from express +1</h1><div><img src="/img/PIA.jpg"/></div>');
    res.redirect('/error/#404');
});

app.listen(4080, function() {
    console.log('Server running at http://*:4080/');
});

htmlViews.test();
