
//import nanoid
import {nanoid} from 'nanoid';
import { useState } from 'react';

function Server(props) {
    let [opponent, setOpponent] = useState("")
    let name = props.name != (null || "") ? props.name : "super radical lobby"
    let author = props.author != (null || "" || true) ? props.author : "ERROR"
    let desc = props.desc != (null || "") ? props.desc : "this nerd forgot to put a description :("
    let playerName = props.playerName
    let id = props.id

    let sendingAttackHornets = () => {
        alert("sending attack hornets...death awaits the enemy")
    }
    let joinServer = () => {
        if (playerName == "youCantSetYourNameAsThis>:)") {
            alert("set ur player name bozo")
            return

        }
        props.socket.emit("joinLobby", JSON.stringify({id:id, author:playerName}))
        props.joinServer(name)
        
    }
    if (author == playerName) {
        return (
            <div className="server" id={`server-${nanoid()}`}>
                <p id="server-name">{name}</p><p id="small-text"> you made this lobby!</p>
                <p id="server-desc">{desc}</p>
             
            </div>
        )
    }
    return (
        <div className="server" id={`server-${nanoid()}`}>
            <p id="server-name">{name}</p><p id="small-text"> hosted by {author}</p>
            <p id="server-desc">{desc}</p>
           
            <button onClick={joinServer} id="server-button">JOIN</button>
            <button onClick={sendingAttackHornets} id="attack-hornets-button">SEND ATTACK HORNETS</button>
        </div>
    )
}
export default Server