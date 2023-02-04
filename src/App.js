import { useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import Chat from './components/Chat';
import LogIn from './components/LogIn';
const socket = io.connect('http://localhost:5000/')

function App() {

  const [userInfo, setUserInfo] = useState(null);
  console.log(userInfo);

  return (
    <div className="App">
      {
        userInfo ?
          <Chat socket={socket} userInfo={userInfo}></Chat>
          :
          <LogIn userInfo={userInfo} setUserInfo={setUserInfo} socket={socket}></LogIn>
      }
    </div>
  );
}

export default App;
