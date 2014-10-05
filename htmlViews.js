
var app = function() {};

app.prototype = function() {
    var test = function() {
        console.log("htmlView says hello.");
    }, engine = function(filePath, options, callback) {
        // console.log('fp', filePath, 'op', options, 'cl', callback);
        return callback(null, "engine test");
    };

    return {
        engine: engine,
        test: test
    };
}();

module.exports = new app();
