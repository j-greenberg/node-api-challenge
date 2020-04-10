const express = require('express'); 

const server = express(); 

server.use(express.json()); // add express middleware
server.use(logger); // add logger middleware

function logger(req, res, next) {
    // Create logger to log all incoming requests and track them
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.originalUrl}`); 
    console.log(`Timestamp: ${new Date().toTimeString()}`); 
}

module.exports = server; 