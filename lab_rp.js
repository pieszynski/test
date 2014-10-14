
// Revealing prototype
// -- co wolno a czego nie można stosować przy stosowaniu w/w wzorca

var vClass = (function(){
    var app = function(op){
        this.opts = {
            o : op,
            it : 0
        };
    }

    app.prototype = function(){
        var self = undefined,
            init = function(_it) {
                self = this;
                self.opts.it = _it;
            },
            gett = function(){
                return { a: (self||this).opts.o, b: (self||this).opts.it };
            };

        return {
            init : init,
            gett : gett
        };
    }();

    return app;
})();

var p1 = new vClass("pp11");
var p2 = new vClass("pp22");
//p2.init();

var fn = function() {
    var p = 23;
    return p1.gett();
}

var fn2 = function(a) {
    return a();
}

// -- NIE WOLNO użyć
// p2.init('moje!');
//
// bo wszystkim instancjom vClass zostanie ustawiony "this"("self") na ten z instancji "p2"
//  co zaskutkuje zmianom zmiennych per klasa na te z "p2" i wynik poniższego bedzie wyglądał:
//
//      "p1.gett() { a: 'pp22', b: 'moje!' }"
//      "p2.gett() { a: 'pp22', b: 'moje!' }"


console.log('p1.gett()', p1.gett());
//      "p1.gett() { a: 'pp11', b: 0 }"

console.log('p2.gett()', p2.gett());
//      "p2.gett() { a: 'pp22', b: 0 }"

console.log('fn()', fn());
//      "fn() { a: 'pp11', b: 0 }"

// Wywołanie poniższego rzuci wyjątkiem gdyż przekazany do metody wskaźnik do funkcji "gett"
//  przy wywołaniu dostał "this" z metody "fn2" zamiast z klasy "p1" zatem nie zawiera obiektu "opts"
//
// console.log(fn2(p1.gett));
//
//    return { a: (self||this).opts.o, b: (self||this).opts.it };
//                                 ^
//    TypeError: Cannot read property 'o' of undefined
