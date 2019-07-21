import React from 'react';
import Div100vh from 'react-div-100vh';
import JoyStick from 'react-joystick';
import axios from "axios";

const joyOptions = {
    mode: 'dynamic',
    catchDistance: 150,
    color: 'white',
    lockY: true
}

const controlSocket = new WebSocket("ws://" + window.location.host + "/controlSocket");

const handleInput = (name, value) => {
  switch(name) {
    case "LEFT":
    case "RIGHT":
      controlSocket.send(JSON.stringify({
        value,
        name
      }));
      break;
    default:
  }
};

const left = manager => managerListener(manager, "LEFT");
const right = manager => managerListener(manager, "RIGHT");

const managerListener = (manager, name) => {
  manager.on('move', (e, stick) => {
    handleInput(name, Math.round(255 * (stick.instance.position.y - stick.position.y) / 50));
  });
  manager.on('end', () => {
    handleInput(name, 0);
  });
};

function App() {

  return (
    <Div100vh>
    <div style={{backgroundColor: "#282c34", display: "flex", height: "100%", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
        <div style={{height: "100%", width: "50%"}}>
          <JoyStick options={joyOptions} containerStyle={{position: "relative", height: "100%", width: "100%"}} managerListener={left} />
        </div>
        <div style={{backgroundColor: "#682c34", height: "100%", width: "50%"}}>
          <JoyStick options={joyOptions} containerStyle={{position: "relative", height: "100%", width: "100%"}} managerListener={right} />
        </div>
      </div>
    </Div100vh>
  );
}

export default App;
