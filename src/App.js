import logo from './logo.svg';
import './App.css';
import React from 'react'
import { useState }  from 'react'
import FightGame from './FightGame';


function App() {

  const [showGame, setShowGame] = useState(false)
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        
        <button onClick={() => setShowGame(!showGame)}>
          {showGame ? 'Stop' : "Start"}
        </button>
          {showGame ? <FightGame /> : null}
       
      {/* </header> */}

    </div>
  );
}

export default App;
