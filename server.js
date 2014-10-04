var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('Witaj gościu!');
}).listen(4080);
console.log('Server running at http://*:4080/');
