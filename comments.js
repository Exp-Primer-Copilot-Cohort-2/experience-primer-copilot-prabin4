//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 3000;

//create server
http.createServer(function (req, res) {

  //parse the request containing file name
  var pathname = url.parse(req.url).pathname;

  //print the name of the file for which request is made
  console.log("Request for " + pathname + " received.");

  //read the requested file content from file system
  fs.readFile(pathname.substr(1), function (err, data) {
    if (err) {
      console.log(err);
      //HTTP Status: 404: NOT FOUND
      //Content Type: text/plain
      res.writeHead(404, { 'Content-Type': 'text/html' });
    } else {
      //Page found
      //HTTP Status: 200 : OK
      //Content Type: text/plain
      res.writeHead(200, { 'Content-Type': 'text/html' });

      //write the content of the file to response body
      res.write(data.toString());
    }
    //send the response body
    res.end();
  });
}).listen(port);

//print the message
console.log("Server running at http://localhost:" + port + "/");