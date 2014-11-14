
## Historia

#### Marek Terencjusz Warron (II-I w. p.n.e.)
1. Gramatyka - pisanie czytanie
2. Dialektyka - logiczne myślenie i wysławianie się
3. Retoryka - wysławianie się w sposób piękny
4. Arytmetyka
5. Geometria
6. Astronomia
7. Muzyka
8. Architektura - zbudować dom i fortyfikacje
9. Medycyna - umiejętność pomocy sobie i innym

## AngularJS

#### $http.post(url, {}) != $http.post(url)
Pierwsze niestety wykonuje zapytanie za pomocą metody OPTIONS a dopiero to drugie jako POST

#### Akcja na dodanie elemetu do DOM (ngRepeat)

    app.directive('itRender', function() {
        return function(scope, elem, attrs) {
            // https://docs.angularjs.org/error/$parse/isecdom
            // angular nie pozwala na bezpośrednie przekazywanie elementów DOM (elem) do metod
            scope._elem = {e : elem};
            scope.$evalAsync(attrs['itRender']);
        };
    });

Użycie:

    <div class="toggle" it-render="hello.renderItem(_elem, item)">

## NodeJs

#### Node sam wykrywa wycieki pamięci
W tym wypadku słusznie

(node) warning: possible EventEmitter memory leak detected. 11 listeners added.
Use emitter.setMaxListeners() to increase limit.
Trace
    at Stream.EventEmitter.addListener (events.js:160:15)
    at Stream.pipe (stream.js:119:10)
    at Server.<anonymous> (...\streamsFile\app.js:42:26)
    at Server.EventEmitter.emit (events.js:98:17)
    at HTTPParser.parser.onIncoming (http.js:2108:12)
    at HTTPParser.parserOnHeadersComplete [as onHeadersComplete\] (http.js:121:23)
    at Socket.socket.ondata (http.js:1966:22)
    at TCP.onread (net.js:527:27)
