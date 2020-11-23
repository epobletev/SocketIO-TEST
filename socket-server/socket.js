const express = require('express');
const http = require('http');
const app = express();
const PORT = 4444||process.env.PORT;
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors:{
        origin:'*',
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

const myCoordenates = {lat:0,long:0}
io.on('connection', (socket) =>{
    socket.on('getCoordenates',(lat,long) =>{
        console.log(lat,long);
        myCoordenates.lat = lat
        myCoordenates.long = long
        io.emit('createMarker', myCoordenates)
    });
    
    
});

server.listen(PORT,()=>console.log(`Listening on ${PORT}`))