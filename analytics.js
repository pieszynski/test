
var MongoClient = require('mongodb').MongoClient;

var connectionString = 'mongodb://localhost:27017/test'
var app = function(){};

app.prototype = function() {
    var self = undefined,
        init = function() {
            if (self)
                return;
            self = this;
        },
        pageHit = function(viewName) {
            MongoClient.connect(
                connectionString,
                {native_parser:true},
                function(err, db) {
                    if (err) {
                        console.log('mconnectErr', err);
                        return;
                    }

                    var now = new Date();
                    var dateColumn = now.getFullYear() * 10000
                        + (now.getMonth() + 1) * 100
                        + now.getDate();

                    db.collection('analytics').update(
                        { date : dateColumn, view : viewName },
                        { $inc : { hits : 1} },
                        { upsert : true },
                        function(err, result){
                            if (err)
                                console.log('colErr', err, result)
                            db.close();
                        });
                });
        };

    return {
        init: init,
        pageHit: pageHit
    }
}();

module.exports = new app();