const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    // lodash
    const num = _.random(1,20);
    const greet = _.once(() => {
        console.log('First time (Showing this once)');
    })
    greet();

    console.log('request made', req.url, req.method);
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url) {
        case '/' :
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/number' :
            res.statusCode = 200;
            res.write('<p>Random number: '+num+'</p>');
            break;
        case '/about' :
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me' :
            res.setHeader('Location', '/about');
            res.statusCode = 301;
            res.end();
            break;
        default :
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    if (path != "./views/") {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.write(data);
                res.end(data);
            }
        })
    }
})

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
})