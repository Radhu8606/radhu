const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath == './') {
        filePath = './priyu.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.jpeg': 'image/jpeg',
        '.jpg': 'image/jpg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.css': 'text/css',
        '.js': 'application/javascript'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile('./404.html', (error, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + err.code + ' ..\n');
                res.end();
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data, 'utf-8');
        }
    });
});

// Listening on all available network interfaces
const port = 3004;
server.listen(port, '0.0.0.0', () => {
    console.log(`server running on port ${port}`);
});
