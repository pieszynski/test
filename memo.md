
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
