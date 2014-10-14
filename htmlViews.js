
var fs = require('fs');
var analytics = require('./analytics');

var app = function(_viewsPath, _mainTemplate, _errorTemplate) {
    this.options = {
        mainTemplate: _mainTemplate,
        // ścieżka do katalogu z widokami tematów
        path: _viewsPath,
        // domyślny szablon błędu nieistnienia jakiegoś obiektu
        error: _errorTemplate || 'error404',
        // pełna ścieżka do szablinu błędu 404
        errorPath: null
    };

    this.options.errorPath = getTopicFile.call(this, this.options.error)
};

app.prototype = function() {
        // element oznaczony tą wartością w szablonie zostanie podminiony
    var bodyTag = '%%%body%%%',
        // zwraca nazwę szablonu głównego
        getMainTemplateName = function() {
            return this.options.mainTemplate;
        }
        // pobranie pełnej ścieżki do treści tematu
        getTopicFile = function(topic) {
            if (!topic || 0 == topic.length)
                return null;

            // temat może składać się tylko ze znaków alfanumerycznych oraz '-'
            if (/^[a-z0-9-]+$/i.test(topic))
                return this.options.path + 'topic/' + topic.toLowerCase() + '.htm';

            return null;
        },
        // główna metoda odpowiadająca za kompilację szablonów
        engine = function(filePath, options, callback) {

            var _this = this;
            // odczytanie pliku szablonu - MUSI istnieć inaczej proces się wywróci
            fs.readFile(filePath, function(err, content){
                if (err) throw new Error(err);

                // pobranie pełnej ścieżki do pliku tematu
                var sTopic = options.topic;

                var tFile = getTopicFile.call(_this, options.topic);
                // jeśli nie udało się pobrać ścieżki to zwracamy komunikat błedu
                if (!tFile) {
                    sTopic = _this.options.error;
                    tFile = _this.options.errorPath;
                }

                // weryfikacja istnienia pliku tematu
                fs.exists(tFile, function(exists) {
                    if (!exists){
                        // zmiana na plik z informacją o błędzie 404
                        tFile = _this.options.errorPath;
                    }

                    // zwiększenie licznika odwiedzin dla konkretnego widoku
                    // nie będzie informacji na temat linków do stron nieistniejących
                    // ale przez to nie pojawi się DOS z odwołaniami do losowych, nieistniejących, stron
                    analytics.pageHit(exists ? sTopic : _this.options.error);

                    // odczytanie pliku tematu lub wyświetlenie komunikaty błędu
                    fs.readFile(tFile, function(err, tContent){
                        if (err) throw new Error(err);

                        // podmiana odpowiedniego miejsca w szablonie na plik z tematem
                        content = content.toString().replace(bodyTag, tContent);
                        callback(null, content);
                    });
                });
            });
        },
        getEngine = function() {
            var _this = this;
            return function(filePath, options, callback) {
                return engine.call(_this, filePath, options, callback);
            }
        };

    return {
        engine: engine,
        getEngine: getEngine,
        getMainTemplateName: getMainTemplateName
    };
}();

module.exports = app;
