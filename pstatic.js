
var mime = require('mime'),
    path = require('path'),
    fs = require('fs');

var app = module.exports = function(fullPath){

    var _fullPath = path.normalize(fullPath);

    return function(req, res, next) {

        var absoluteFilePath = path.normalize(_fullPath + req.originalUrl),
            mimeType = mime.lookup(absoluteFilePath);

        if (0 <= absoluteFilePath.indexOf('..')) {

            res.status(404).end();
            return;

        }

        fs.exists(absoluteFilePath, function(exists) {

            if (!exists) {

                next();
                return;

            }

            //console.log('getting file', absoluteFilePath);
            fs.readFile(absoluteFilePath, function(err, buffer) {

                res.set({
                  'Content-Type': mimeType,
                  'Content-Length': buffer.length
                });

                res.status(200).send(buffer);

            });

        });

    };

};

