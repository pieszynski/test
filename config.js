
var fs = require('fs');

var app = function(){};

app.prototype = function(){
    var options = {
            configFile: null,
            port: 4080,
            dbConnection: null
        },
        _isInited = false,
        // asynchroniczne wczytanie konfiguracji.
        //  po zakończeniu wywoływana jest metoda "callback"
        init = function(callback, printCfg){
            if (_isInited) {
                callback();
                return;
            }

            _isInited = true;

            if (3 > process.argv.length) {
                callback();
                return;
            }

            options.configFile = process.argv[2];

            fs.exists(options.configFile, function(exists) {
                if (!exists) {
                    console.log('noConf', options.configFile);
                    callback();
                    return;
                }

                fs.readFile(options.configFile, function(err, data) {
                    if (err) {
                        console.log('confReadErr', err);
                        callback();
                        return;
                    }

                    try {
                        var oData = JSON.parse(data);

                        if (printCfg)
                            console.log('### cfg', oData);

                        options.port = oData.port || options.port;
                        options.dbConnection = oData.dbConnection || options.dbConnection;

                    } catch (ex) {
                        console.log('confParseErr', ex);
                    } finally {
                        callback();
                    }
                });
            })
        },
        // pobranie ścieżki połączeniowej do bazy danych
        getDbConnection = function() {
            return options.dbConnection;
        },
        // pobranie portu na którym ma być uruchomiony serwer
        getPort = function() {
            return options.port;
        };

    return {
        getDbConnection : getDbConnection,
        getPort : getPort,
        init : init
    };
}();

// zmienne przekazywane do skryptu znajdują się w "process.argv"
//
// for(var i in process.argv) {
//     console.log(i, process.argv[i]);
// }

module.exports = new app();
