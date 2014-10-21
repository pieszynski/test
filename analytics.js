
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
        logRequest = function(req,res,callback) {
            var rEnd = res.end;
            var response = _nowDate();
            var now = new Date();
            var t0 = process.hrtime();

            // podmieniamy metodę .end() aby przechwycić wynik działania
            res.end = function(){
                res.end = rEnd;
                rEnd.apply(this, arguments);
                var t = process.hrtime(t0);
                var nsecs = t[0] * 1e9 + t[1];
                var msecs = nsecs / 1e6;

                response += " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
                response += " " + req.connection.remoteAddress;
                response += " " + req.hostname;
                response += " " + req.method;
                response += " " + res.statusCode;
                response += " perf::" + msecs + "ms";
                response += " ba::" + req.baseUrl;
                response += " or::" + req.originalUrl;
                response += " ref::\"" + req.headers.referer + "\"";
                response += " ua::" + req.headers['user-agent'];

                callback(response);
            }
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
