// rejestracja kontrolerów dodatkowych

var app = function () {};
app.prototype = function () {
    var _baseUrl = '/api',
        register = function (router) {

            // kontroler testowy do sprawdzenia czy serwis działa
            router.post(_baseUrl + '/ping', function (req, res) {
                res.set({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.send({ title : 'ping', time : (new Date()).getTime() });
            })
        };

    return {
        register : register
    };
}();

module.exports = app;
