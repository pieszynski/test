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
                            de : 'verteidigen',
                            pl : 'bronić'
                            des: 'Die Magisterarbeit wird verteidigt.',
                            pls: 'Praca magisterska została obroniona.'
                        },
                        {
                            de : 'entsetzt',
                            pl : 'przerażony',
                            des: 'Meine Schwester ist entsetzt.',
                            pls: 'Moja siostra jest przerażona.'
                        },
                        {
                            de : 'tippen',
                            pl : 'pisać, puknąć',
                            des: 'Punkąłem go w ramię.',
                            pls: 'Ich habe ihn an die Schulter getippt.'
                        },
                        {
                            de : 'rühren',
                            pl : 'mieszać',
                            des: 'Deine Mutter rührt den Teig.',
                            pls: 'Twoja mama miesza ciasto.'
                        },
                        {
                            de : '(da)zugegen',
                            pl : 'dodawać'
                        },
                        {
                            de : 'übrigens',
                            pl : 'przy okazji, a propos'
                        },
                        {
                            de : 'lecker',
                            pl : 'pyszny'
                        },
                        {
                            de : 'e Kirsche,-n',
                            pl : 'wiśnia'
                        },
                        {
                            de : 'herstellen',
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
