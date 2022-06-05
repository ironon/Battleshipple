
import './App.css';
import Tile from './Tile';
import Menu from './Menu';
import {useState} from 'react';
import {nanoid} from 'nanoid';
const io = require("socket.io-client");
const socket = io("http://localhost:5000", {
  withCredentials: true,
});


// let tk Create a 5x6 2d array of Tile components
let tk = [];
for (let i = 0; i < 5; i++) {
    tk[i] = [];
    for (let j = 0; j < 6; j++) {
        tk[i][j] = <Tile position={{x:i,y:j}} key={nanoid()} />;
    }
}



function App(props) {
  let [tiles, setTiles] = useState(tk);
  let [menuVisible, setMenuVisible] = useState(false);
  let openMenu = () => {
    setMenuVisible(true);
  }
  let startGame = () => {
    setMenuVisible(false);

  }
  const setTheTiles = (tiles) => {
    console.log("setting tiles")
    // setTiles(tiles)
  }
  return (
    <div className="App">
      <div id="title">
      <h2>BATTLESHIPPLE</h2>
      </div>
      <div id="tiles-header">
      <Menu id="menu" setTiles={setTheTiles} startGame={startGame} socket={socket} visible={menuVisible}/>
      <header className="App-header">
        
        
        {tiles}

        
      </header>
      </div>
      
      <div id="play-div">
      <button onClick={openMenu} id="play-button">PLAY</button>
      </div>
    </div>
  );
}

export default App;
