//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');

//create server
http.createServer(function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    //if request is post
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function(data) {
            body += data;
            //if body > 1e6
            if (body.length > 1e6) {
                req.connection.destroy();
            }
        });
        req.on('end', function() {
            var POST = qs.parse(body);
            var comment = POST['comment'];
            if (comment) {
                fs.appendFile('comments.txt', comment + '\n', function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end();
    } else {
        //if request is get
        fs.readFile('comments.txt', function(err, data) {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    }
}).listen(8080);
console.log('Server running at http://localhost:8080');