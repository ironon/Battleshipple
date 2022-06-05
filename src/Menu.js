

import CreateLobby from "./CreateLobby"
import Server from "./Server"
//import useState
import React, { useState } from "react"
import { nanoid } from "nanoid"


function generateServerId() {
    let id = nanoid()

    return id
}
function Menu(props) {
    const [lobbyVis, setLobbyVis] = useState(false)
    let [serverClicked, setServerClicked] = useState(false)
    let [playerName, setPlayerName] = useState("youCantSetYourNameAsThis>:)")
    let [opponent, setOpponent] = useState("")
    let [host, setHost] = useState("")

    
    let visible = props.visible
   

    //UNFINISHED
    
    function getLobbiesFromServer() {
        
        // //get lobbies from server
        // //set lobbies to state
        // if (canRequest == true) {
        //     let info = fetch("http://localhost:5000", {
        //     method: 'POST',
        //     mode: 'cors', // this cannot be 'no-cors'
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({"request": "getServers"})

        // })
        // info.then(res => res.json()).then(data => {
        //     setServerList(serverList.filter(server => server.author == true).concat(Object.values(data).filter(server => !(myServers.includes(server.id)))))
        //     setCanRequest(false)
        //     setTimeout(() => {
        //         setCanRequest(true)
        //     }, 10000) //another security risk ik
        // })
        // }
        
        return []
    }

    let [serverList, setServerList] = useState([])
    getLobbiesFromServer()

    
    let sendLobbyToServer = (name, desc) => {

        let id = generateServerId()
        setServerList(serverList.concat([{name:name, desc:desc, author:playerName, id:id}]))
        props.socket.emit("createLobby", JSON.stringify({name:name, desc:desc, author:playerName, id:id}))
    }

    let createLobby = () => {
        if (playerName != "youCantSetYourNameAsThis>:)") {
            setLobbyVis(true)
            setServerClicked(true)
        } else {
            alert("you forgot to set your name bozo. get better. L easton was here")
        }
        
        
    }
    const kickPlayer = () => {
        props.socket.emit("kickPlayer")
    }
    props.socket.on("getServerListInit", (data) => {
        setServerList(JSON.parse(data))
    })
    props.socket.on("kicked", (data) => {
        alert("wow you got kicked. you should become more likeable. honestly a skill issue tbh be honest.")

    })
    props.socket.on("lobbyCreationEvent", (message) => {
        let data = JSON.parse(message)
        setServerList(serverList.concat([data]))
    })
    props.socket.on("lobbyDeletionEvent", (message) => {
	
        let data = JSON.parse(message)
        setServerList(serverList.filter(server => server.id != data.id))
    })
    props.socket.on("opponentJoined", (message) => {
        let data = JSON.parse(message)
        
        setOpponent(data.author)
    })
    let addServer = (name, desc) => {
              
        sendLobbyToServer(name, desc)
        
    }
    let joinServer = (server) => {
        setLobbyVis(true)
        setServerClicked(true)
        setHost(server)

    }
    let deleteLobby = () => {
        const myLobby = serverList.filter(server => server.author == playerName)
        props.socket.emit("deleteLobby", JSON.stringify({id:myLobby[0].id}))
        setServerList(serverList.filter(server => server.author != playerName))
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
                {serverList.map(server => <Server key={nanoid()} name={server.name} joinServer={joinServer} socket={props.socket} startGame={props.startGame} id={server.id} setTiles={props.setTiles} playerName={playerName} desc={server.desc} author={server.author} />)}
            </div>
            <button onClick={createLobby} id="create-server">Create Lobby</button>
            <CreateLobby visible={lobbyVis} opponent={opponent} kickPlayer={kickPlayer} host={host} addServer={addServer} deleteLobby={deleteLobby}/>
        </div>
    )
    } else if (serverClicked == true) {
    return(
        <div id="menu">
            <h3 id="menu_title">professioasal lobby fidner</h3>
            <div id="servers-display">
                {serverList.map(server => <Server key={nanoid()} name={server.name} joinServer={joinServer} socket={props.socket} startGame={props.startGame} id={server.id} setTiles={props.setTiles} playerName={playerName} desc={server.desc} author={server.author} />)}
            </div>
          
            <CreateLobby visible={lobbyVis} opponent={opponent} kickPlayer={kickPlayer} host={host} addServer={addServer} deleteLobby={deleteLobby}/>
        </div>
    )
    }
}

export default Menu