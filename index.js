// import server from server.js
const server = require('./server.js'); 

const port = 4000; 

server.listen(port, () => {
    console.log(`Server is now listening on http://localhost:${port}`); 
})