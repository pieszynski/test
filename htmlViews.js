
var fs = require('fs');

var app = function(_viewsPath, _mainTemplate, _errorTemplate) {
    this.options = {
        mainTemplate: _mainTemplate,
        // ścieżka do katalogu z widokami tematów
        path: _viewsPath,
        // domyślny szablon błędu nieistnienia jakiegoś obiektu
        error: _errorTemplate || 'error404',
        // pełna ścieżka do szablinu błędu 404
        errorPath: undefined
    };
};

app.prototype = function() {
    // wskaźnik THIS
    var self = undefined,
        // element oznaczony tą wartością w szablonie zostanie podminiony
        bodyTag = '%%%body%%%',
        // funkcja testowa - sprawdzanie czy wszystko działa
        test = function() {
            console.log("htmlView pozdrawia");
            return self;
        },
        getMainTemplateName = function() {
            return self.options.mainTemplate;
        }
        // pobranie pełnej ścieżki do treści tematu
        getTopicFile = function(topic) {
            if (!topic || 0 == topic.length)
                return null;

            // temat może składać się tylko ze znaków alfanumerycznych oraz '-'
            if (/^[a-z0-9-]+$/i.test(topic))
                return self.options.path + 'topic/' + topic.toLowerCase() + '.htm';

            return null;
        },
        // główna metoda odpowiadająca za kompilację szablonów
        engine = function(filePath, options, callback) {

            // odczytanie pliku szablonu - MUSI istnieć inaczej proces się wywróci
            fs.readFile(filePath, function(err, content){
                if (err) throw new Error(err);

                // pobranie pełnej ścieżki do pliku tematu
                var tFile = getTopicFile(options.topic);
                // jeśli nie udało się pobrać ścieżki to zwracamy komunikat błedu
                tFile = tFile || self.options.errorPath;

                // weryfikacja istnienia pliku tematu
                fs.exists(tFile, function(exists) {
                    if (!exists){
                        // zmiana na plik z informacją o błędzie 404
                        tFile = self.options.errorPath;
                    }

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
        init = function(){
            self = this;

            // inicjalizacja ścieżki do szablonu z błędem 404
            self.options.errorPath = getTopicFile(self.options.error);

            return self;
        };

    return {
        __express: engine,
        engine: engine,
        getMainTemplateName: getMainTemplateName,
        init: init,
        test: test
    };
}();

module.exports = app;
