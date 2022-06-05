const { json } = require('express');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
      
    }
  });
  function inverse(obj){
    var retobj = {};
    for(var key in obj){
      retobj[obj[key]] = key;
    }
    return retobj;
  }

let GameServers = {}
let playersAndServers = {}


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/controlPanel.html');
});

io.on('connection', (socket) => {
    var id
    socket.emit("getServerListInit", JSON.stringify(Object.values(GameServers)))
    socket.on("createLobby", (message) => {

        let data = JSON.parse(message)
        if (data.id in GameServers) {
           
            return
        }
        id = data.id
        GameServers[data.id] = data
        playersAndServers[data.id] = {}
        playersAndServers.[data.id].host = socket
        socket.broadcast.emit("lobbyCreationEvent", message)
    })
    socket.on("joinLobby", (message) => {
       
        let data = JSON.parse(message)
       
        if (data.id in GameServers) {
          // GameServers[data.id].opponent = socket
          playersAndServers[data.id].opponent = socket
          playersAndServers[data.id].host.emit("opponentJoined", JSON.stringify(data))
        }
    })
    socket.on("kickPlayer" , () => {
        let data = JSON.parse(message)
        let inv = inverse(playersAndServers)[socket]
        GameServers[inv].opponent = null
        playersAndServers[inv].opponent.emit("kicked", JSON.stringify(data))

        
    })
    socket.on("deleteLobby", (message) => {
     
        let data = JSON.parse(message)
  
        if (data.id in GameServers) {
     
            delete GameServers[data.id]
            socket.broadcast.emit("lobbyDeletionEvent", message)
        }
    })
    socket.on('disconnect', (reason) => {
        delete GameServers[id]  
        socket.broadcast.emit("lobbyDeletionEvent", JSON.stringify({id:id}))
    });
  });

server.listen(5000, () => {
  console.log('listening on *:5000');
});