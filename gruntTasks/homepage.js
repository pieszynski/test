
var fs = require('fs'),
    path = require('path'),
    colors = require('colors');

module.exports = function(grunt) {

    var _pagesFile = npath('/pages.json'),
        _templatePath = undefined,
        _feedPath = undefined,
        _outPath = undefined,
        _config = undefined,
        _done = undefined;

    var RssPreamble = '<?xml version="1.0" encoding="utf-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>@pieszynski.com</title><link>http://www.pieszynski.com/</link><description>Co nowego na stronie pieszynski.com</description><atom:link href="http://www.pieszynski.com/feed.rss" rel="self" type="application/rss+xml" />\r\n',
        RssTail = '\r\n</channel></rss>';

    grunt.registerTask('makeHomepage', function() {

        _done = this.async();

        asyncReadFile(_pagesFile, parseConfig);

        grunt.log.writeln(_pagesFile);
    });

    function parseConfig(data) {

        _config = JSON.parse(data);

        _templatePath = npath(_config.templatePath);
        _feedPath = npath(_config.feedPath);
        _outPath = npath(_config.outPath);

        asyncReadFile(_templatePath, openTemplateAndMakeHomeAndFeed)

    }

    function openTemplateAndMakeHomeAndFeed(templateData) {

        var html = '<ul>\r\n',
            rss = RssPreamble;

        for(var i = 0; i < _config.pages.length; i++) {

            var p = _config.pages[i];

            // HTML
            html += '<li><a href="';
            html += _config.pagesRoute + p.name;
            html += '">';
            html += p.title;
            html += '</a></li>\r\n';

            // RSS
            rss += '<item><title>';
            rss += p.title;
            rss += '</title><description>';
            rss += p.description;
            rss += '</description><link>';
            rss += _config.link + _config.pagesRoute + p.name;
            rss += '</link><guid>';
            rss += _config.link + _config.pagesRoute + p.name;
            rss += '</guid><pubDate>';
            rss += (new Date(p.date)).toUTCString();
            rss += '</pubDate></item>\r\n';
        }

        html += '</ul>';
        rss += RssTail;

        var outFileData = templateData.replace(_config.replace, html);
            wait = prepareWait(2, function () {

                _done(true);

            });


        asyncWriteFile(_outPath, outFileData, wait);
        asyncWriteFile(_feedPath, rss, wait);
    }

    function asyncWriteFile(fpath, data, callback) {

        fs.writeFile(fpath, data, { encoding : 'utf8' }, function (err) {

            if (err) {
                grunt.log.writeln('Error writing file.'.red, _config.outPath.red, err);
                _done(false);
                return;
            }

            callback();

        });

    }

    function asyncReadFile(fpath, callback) {

        fs.readFile(fpath, 'utf8', function (err, data) {

            if (err) {
                grunt.log.writeln('Error reading file.'.red, fpath.red, err);
                _done(false);
                return;
            }

            callback(data);

        })
    }

    function prepareWait(times, callback) {

        var _times = times,
            _callback = callback,
            _status = true;

        return function (status) {

            _times--;
            _status = _status && status;

            if (_times <= 0)
                _callback(_status);
        }
    }

    function npath(inpath) {

        return path.normalize(path.resolve() + inpath);

    }

    grunt.log.writeln('makeHomepage registered');
}
