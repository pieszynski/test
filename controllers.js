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
            });

            // kontroler testowy - słówka z niemieckiego
            router.post(_baseUrl + '/lang/depl', function (req, res) {
                res.set({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.send({
                    content : [
                        {
                            de : 'hersetellen',
                            pl : 'produkować'
                        },
                        {
                            de : 'hart und bitter',
                            pl : 'twardy i gorzki'
                        },
                        {
                            de : 'sich ärgern über',
                            pl : 'denerwować się na'
                        }
                    ],
                    time : (new Date()).getTime()
                });
            });
        };

    return {
        register : register
    };
}();

module.exports = app;
