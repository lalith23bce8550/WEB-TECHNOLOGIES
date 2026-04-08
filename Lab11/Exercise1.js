const http = require('http');

console.log("STARTING SERVER...");  

const server = http.createServer((req, res) => {
    console.log("Request received"); 

    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/') {
        res.write('Welcome to Home Page');
    } else if (req.url === '/about') {
        res.write('About Page');
    } else {
        res.write('Page Not Found');
    }

    res.end();
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
