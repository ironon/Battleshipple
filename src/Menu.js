

import CreateLobby from "./CreateLobby"
import Server from "./Server"
//import useState
import { useState } from "react"
import { nanoid } from "nanoid"
let num = 0
let myServers = []
function davidlog(data) {
    console.log(data)
    num = num + 1
    console.log(num)
}
function generateServerId() {
    let id = nanoid()
    myServers.push(id)
    return id
}
function Menu(props) {
    const [lobbyVis, setLobbyVis] = useState(false)
    let [serverClicked, setServerClicked] = useState(false)
    let [playerName, setPlayerName] = useState("youCantSetYourNameAsThis>:)")
    let [canRequest, setCanRequest] = useState(true)
    
    let visible = props.visible
   

    //UNFINISHED
    
    function getLobbiesFromServer() {
        
        //get lobbies from server
        //set lobbies to state
        if (canRequest == true) {
            let info = fetch("http://localhost:5000", {
            method: 'POST',
            mode: 'cors', // this cannot be 'no-cors'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"request": "getServers"})

        })
        info.then(res => res.json()).then(data => {
            setServerList(serverList.filter(server => server.author == true).concat(Object.values(data).filter(server => !(myServers.includes(server.id)))))
            setCanRequest(false)
            setTimeout(() => {
                setCanRequest(true)
            }, 10000) //another security risk ik
        })
        }
        
        return []
    }

    let [serverList, setServerList] = useState([])
    getLobbiesFromServer()


    let sendLobbyToServer = (name, desc, author) => {
        console.log("sending lobby to server..")
        let id = generateServerId()
        setServerList(serverList.concat([{name:name, desc:desc, author:author, id:id}]))
        let info = fetch("http://localhost:5000", {
            method: 'POST',
            mode: 'cors', // this cannot be 'no-cors'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                desc: desc,
                request: "createServer",
                id: id, // yes i know this is a terrible idea to allow the client to set the id, because it allows anyone who knows what they r doing to delete servers, but in my defense, it'll be funny
            
                host: playerName
            }
            )

        })
        info.then(res => res.json())
        .then(res => davidlog(res))
    }

    let createLobby = () => {
        if (playerName != "youCantSetYourNameAsThis>:)") {
            setLobbyVis(true)
            setServerClicked(true)
        } else {
            alert("you forgot to set your name bozo. get better. L easton was here")
        }
        
        
    }
    let addServer = (name, desc, author) => {
      
        
        sendLobbyToServer(name, desc, author)
        console.log(serverList)
    }
    let deleteLobby = () => {
        console.log("äsdm")
        setServerList(serverList.filter(server => server.author != true))
    }
    if (visible != true) {
        return null
    }
    if (serverClicked == false) {
    return(
        
        <div id="menu">
            <input id="player-name" placeholder="Enter your username...or else" onChange={(e) => setPlayerName(e.target.value)}></input>
            <h3 id="menu_title">professioasal lobby fidner</h3>
            <div id="servers-display">
                {serverList.map(server => <Server key={nanoid()} name={server.name} startGame={props.startGame} id={server.id} setTiles={props.setTiles} desc={server.desc} author={server.author} />)}
            </div>
            <button onClick={createLobby} id="create-server">Create Lobby</button>
            <CreateLobby visible={lobbyVis} addServer={addServer} deleteLobby={deleteLobby}/>
        </div>
    )
    } else if (serverClicked == true) {
    return(
        <div id="menu">
            <h3 id="menu_title">professioasal lobby fidner</h3>
            <div id="servers-display">
                {serverList.map(server => <Server key={nanoid()} name={server.name} desc={server.desc} author={server.author} />)}
            </div>
          
            <CreateLobby visible={lobbyVis} addServer={addServer} deleteLobby={deleteLobby}/>
        </div>
    )
    }
}

export default Menu