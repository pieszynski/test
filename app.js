
// konfiguracja przekazywana jako drugi parametr wywołania np.:
// > node app.js config.json
//
//  plik konfiguracyjny w formacie
//  {
//      "port" : 4080,
//      "dbConnection" : "mongodb://localhost:27017/test",
//      "logRequest" : true,
//      "logStatic" : true
//  }
//

var viewsPath = __dirname + '/app/views/';

var compression = require('compression'),
    express = require('express'),
    router = express.Router(),
    serveStatic = require('serve-static');

GLOBAL.appConfig = require('./config');

var confCallback = function() {

    var htmlViewsClass = require('./htmlViews');
    var ControllersClass = require('./controllers/controllers');
    GLOBAL.analytics = require('./analytics');

    var htmlViews = new htmlViewsClass(viewsPath, 'mainTemplate');
    var controllers = new ControllersClass();

    var appPort = GLOBAL.appConfig.getPort();
    var app = module.exports = express();

    function logAllRequests(injectNow) {
        if (GLOBAL.appConfig.doLogRequests() && injectNow) {
            app.use(/.*/i, function(req,res,next) {
                GLOBAL.analytics.logRequest(req,res,function(data) {
                    console.log(data);
                });

                next();
            });
        }
    }

    app.set('views', viewsPath);
    app.set('view engine', 'htm');

    app.engine('htm', htmlViews.getEngine());

    app.disable('x-powered-by');

    app.use(compression());

    logAllRequests(GLOBAL.appConfig.doLogStatic());

    app.use(serveStatic(__dirname + '/app'));

    logAllRequests(!(GLOBAL.appConfig.doLogStatic()));

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

    // rejestracja kontrolerów zewnętrznych
    controllers.register(router);

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
