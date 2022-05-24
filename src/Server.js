
//import nanoid
import {nanoid} from 'nanoid';
import { useState } from 'react';

function Server(props) {
    let [opponent, setOpponent] = useState("")
    let name = props.name != (null || "") ? props.name : "super radical lobby"
    let author = props.author != (null || "" || true) ? props.author : "you!!!"
    let desc = props.desc != (null || "") ? props.desc : "this nerd forgot to put a description :("
    let id = props.id
    console.log(id)
    let sendingAttackHornets = () => {
        alert("sending attack hornets...death awaits the enemy")
    }
    let joinServer = () => {
        setOpponent("you!!")
        let joinServerRequest = fetch("http://localhost:5000", {
            method: 'POST',
            mode: 'cors', // this cannot be 'no-cors'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                request: "joinServer",
                id: props.id,
            })
        })
        joinServerRequest.then(res => res.json()).then(data => {
            console.log(data)
            props.startGame(data)
        
            props.setTiles(data.board)
        })

        let waitForOpponent = fetch("http://localhost:5000", {
            method: 'POST',
            mode: 'cors', // this cannot be 'no-cors'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                request: "waitForOpponent"
    
            })
        })
        waitForOpponent.then(res => res.json()).then(data => {
            console.log(data)
            setOpponent(data.opponent)
        })
        
        
        
    }
    if (props.author == true) {
        return (
            <div className="server" id={`server-${nanoid()}`}>
                <p id="server-name">{name}</p><p id="small-text"> hosted by you!!!</p>
                <p id="server-desc">{desc}</p>
                <p id="opponent">Opponent: {opponent}</p>
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