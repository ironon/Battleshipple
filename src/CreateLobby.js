import {useState} from "react"	

function CreateLobby(props) {
    let [lobbyName, setLobbyName] = useState("")
    let [lobbyDesc, setLobbyDesc] = useState("")
    let [lobbyMade, setLobbyMade] = useState(0)

    if (props.visible == false) {
        return null
    }
    const handleNameChange = (event) => {
        setLobbyName(event.target.value)
    }
    const handleDescChange = (event) => {
        setLobbyDesc(event.target.value)
    }
    const doSubmit = (e) => {
        e.preventDefault()

        props.addServer(lobbyName, lobbyDesc, true);
        setLobbyName("")
        setLobbyDesc("")
        setLobbyMade(1)
        return false;
    }
    const deleteLobby = () => {
        props.deleteLobby()
        setLobbyMade(0)
    }
    if (lobbyMade == 0) {
        return (
            <div id="create-lobby-div">
                <h3 id="create-lobby-title">Create Lobby</h3>
                <form id="create-lobby-form" onSubmit={doSubmit}>
                    <label htmlFor="lobby-name">Lobby Name:</label>
                    <input type="text" className="lobbyLabel" id="lobby-name" name="lobby-name" value={lobbyName} onChange={handleNameChange} placeholder="david's super radical epic lobby" />
                    <label htmlFor="lobby-desc">Lobby Description:</label>
                    <input type="text" className="lobbyLabel" id="lobby-desc" name="lobby-desc" value={lobbyDesc} onChange={handleDescChange} placeholder="join or i forcefeed you broccoli" />
                    <button id="create-lobby-button" type="submit">Create Lobby</button>
                </form>
    
            </div>
        )
    } else if (lobbyMade == 1) {
        return (
            <div id="create-lobby-div">
                <h3 id="create-lobby-title">Lobby Created!</h3>
                <button onClick={deleteLobby} id="delete-server">Delete Lobby</button>
            </div>
        )
    }
    
    
}

export default CreateLobby