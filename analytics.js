
var MongoClient = require('mongodb').MongoClient;

var connectionString = GLOBAL.appConfig.getDbConnection();
var app = function(){};

app.prototype = function() {
    var _execute = function(action) {
            MongoClient.connect(
                connectionString,
                {native_parser:true},
                function(err, db) {
                    if (err) {
                        console.log('mconnectErr', err);
                        return;
                    }

                    action(db, function(err, result) {
                        db.close();
                    });
                });
        },
        _nowDate = function() {
            var now = new Date();
            var dateColumn = now.getFullYear() * 10000
                + (now.getMonth() + 1) * 100
                + now.getDate();

            return dateColumn;
        }
        logRequest = function(req) {
            var response = _nowDate();
            var now = new Date();

            response += " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
            response += " " + req.connection.remoteAddress;
            response += " " + req.hostname;
            response += " " + req.baseUrl;
            response += " " + req.method;
            response += " \"" + req.headers.referer + "\"";
            response += " " + req.headers['user-agent'];

            return response;
        },
        pageHit = function(viewName) {
            _execute.call(this, function(db, callback) {

                db.collection('analytics').update(
                    { date : _nowDate(), view : viewName },
                    { $inc : { hits : 1} },
                    { upsert : true },
                    callback);
            });
        };

    return {
        logRequest : logRequest,
        pageHit : pageHit
    }
}();

module.exports = new app();
