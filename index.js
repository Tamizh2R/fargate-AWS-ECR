const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('final with testing FARGATE IS WORKING WITH JENKINS PIPELINE 2nd test works !!!!!!!!!!\n');
});

server.listen(80, '0.0.0.0', () => {
    console.log('Server is running on port 80');
});

