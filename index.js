const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('FARGATE IS WORKING WITH JENKINS PIPELINE!!!!!!!!!!\n');
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});

