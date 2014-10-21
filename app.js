
// konfiguracja przekazywana jako drugi parametr wywołania np.:
// > node app.js config.json
//
//  plik konfiguracyjny w formacie
//  {
//      "port" : 4080,
//      "dbConnection" : "mongodb://localhost:27017/test",
//      "logRequest" : true
//  }
//

var viewsPath = __dirname + '/app/views/';

var compression = require('compression');
var express = require('express');
var router = express.Router();

GLOBAL.appConfig = require('./config');

var confCallback = function() {

    var htmlViewsClass = require('./htmlViews');
    GLOBAL.analytics = require('./analytics');

    htmlViews = new htmlViewsClass(viewsPath, 'mainTemplate');

    var appPort = GLOBAL.appConfig.getPort();
    var app = module.exports = express();

    app.set('views', viewsPath);
    app.set('view engine', 'htm');

    app.engine('htm', htmlViews.getEngine());

    app.use(compression());

    app.use(express.static(__dirname + '/app'));
    //app.use('/bootstrap', express.static(__dirname + '/bower_components/bootstrap/dist'));
    app.use('/angular', express.static(__dirname + '/bower_components/angular'));
    app.use('/jquery', express.static(__dirname + '/bower_components/jquery/dist'));
    app.use('/underscore', express.static(__dirname + '/bower_components/underscore'));
    app.use('/underscorestring', express.static(__dirname + '/bower_components/underscore.string/dist'));

    if (GLOBAL.appConfig.doLogRequests()) {
        app.use(/.*/i, function(req,res,next) {
            GLOBAL.analytics.logRequest(req,res,function(data) {
                console.log(data);
            });

            next();
        });
    }

    router.param('topic', function(req, res, next, topic) {
        req.site = req.site || {};
        req.site.topic = topic;

        next();
    });

    function defaultRouteAction(req,res,next) {
        req.site = req.site || {};
        req.site.topic = req.site.topic || 'home';
        req.site.info = { req : req, res : res };

        res.render(htmlViews.getMainTemplateName(), req.site);
    }

    function noRouteAction(req,res,next) {
        res.render(htmlViews.getMainTemplateName(), { topic : null, info : { req : req, res : res } });
    }

    router.post('/ping', function(req,res,next) {
        res.set({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.send({ title : 'ping', time : (new Date()).getTime() });
    });

    router.get('/temat/:topic', defaultRouteAction);
    router.get('/', defaultRouteAction);
    router.get(/.*/i, noRouteAction);

    app.all(/.*/i, router);
    app.all('/', router);

    app.listen(appPort, function() {
        console.log('Server running at http://*:' + appPort);
    });
};

appConfig.init(confCallback, true);
