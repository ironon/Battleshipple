
const express = require('express'); //Import the express dependency
const bodyParser = require('body-parser');
const app = express();       

app.use(bodyParser.urlencoded({ extended: true }));       //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening

let num = 0
function davidlog(data) {
    console.log(data)
    num = num + 1
    console.log(num)
}

const cors=require("cors");
const { json } = require('express');
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


let servers = {

}
let waiters = {}

// serverInfo = {
//     name: userGivenData.name,
//     host: userGivenData.host,
//     desc: userGivenData.desc,
//     players: [],
//     board: [[], [], [], [], [], []]
// }

const createServer = (data) => {
    
     
    let newServer = {
        name: data.name,
        host: data.host,
        desc: data.desc,
        id: data.id,
        opponent: null,
        board: [[], [], [], [], [], []]

    }
    servers[data.id] = newServer
    davidlog(newServer)
    return newServer


}

function updateServerInfo(data) {
    serverInfo.players.push({name: data.name})
}
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json())
//Idiomatic expression in express to route and respond to a client request


app.post('/', function requestHandler(req, res) {
    
    let data = req.body;
    if (data.request == "getServers") {
        res.end(JSON.stringify(servers))
    } else if (data.request == "createServer") {
        let serverInfo = createServer(data)
        res.end(JSON.stringify(serverInfo));
       
    } else if (data.request == "joinServer") {
        console.log(data)
        servers[data.id].opponent = data.id
        waiters[data.id].send(JSON.stringify(servers[data.id]))
        
        res.end(JSON.stringify(servers[data.id]))
    } else if (data.request == "waitForOpponent") {
        waiters[data.id] = res
    }
    
  });

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});