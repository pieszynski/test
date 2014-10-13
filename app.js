
var viewsPath = __dirname + '/app/views/';

var compression = require('compression');
var express = require('express');
var router = express.Router();
var htmlViewsClass = require('./htmlViews');

htmlViews = new htmlViewsClass(viewsPath, 'mainTemplate').init();

var appPort = 4080;
var app = module.exports = express();

app.set('views', viewsPath);
app.set('view engine', 'htm');

app.engine('htm', htmlViews.__express);

app.use(compression());

app.use(express.static(__dirname + '/app'));
//app.use('/bootstrap', express.static(__dirname + '/bower_components/bootstrap/dist'));
app.use('/angular', express.static(__dirname + '/bower_components/angular'));
app.use('/jquery', express.static(__dirname + '/bower_components/jquery/dist'));
app.use('/underscore', express.static(__dirname + '/bower_components/underscore'));
app.use('/underscorestring', express.static(__dirname + '/bower_components/underscore.string/dist'));

router.param('topic', function(req, res, next, topic) {
    req.site = req.site || {};
    req.site.topic = topic;

    next();
});

function defaultRouteAction(req,res,next) {
    req.site = req.site || {};
    req.site.topic = req.site.topic || 'home';

    res.render(htmlViews.getMainTemplateName(), req.site);
}

function noRouteAction(req,res,next) {
    res.render(htmlViews.getMainTemplateName(), { topic : null });
}

router.get('/temat/:topic', defaultRouteAction);
router.get('/', defaultRouteAction);
router.get(/.*/i, noRouteAction);

app.get('/favicon.ico', function(req,res){
    res.status(404).end();
})

app.get(/.*/i, router);
app.get('/', router);

app.listen(appPort, function() {
    console.log('Server running at http://*:' + appPort);
});
