// import Express
const express = require('express'); 

// instantiate Express
const server = express(); 

// Import Routers
const projectRouter = require('./routers/projectRouter.js'); // import Project router
const actionRouter = require('./routers/actionRouter.js'); // import Action router

server.use(express.json()); // add express middleware to Server
server.use(logger); // add logger middleware to Server
server.use("/api/projects", projectRouter); // add custom Routing to Server
server.use("/api/actions", actionRouter); // add custom Routing to Server

function logger(req, res, next) {
    // Create logger to log all incoming requests and track them
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.originalUrl}`); 
    console.log(`Timestamp: ${new Date().toTimeString()}`); 
    next(); 
}

server.get("/", (req, res) => {
    console.log("New GET request detected to path '/'!"); 
    res.status(200).json({message: "Hi there from the server!"}); 
})

module.exports = server; 