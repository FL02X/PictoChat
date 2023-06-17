import { useEffect, useState } from "react";
import React from "react";
import Login from "./routes/Login";
import Chat from "./components/Chat";
import Input from "./components/Input";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [currentSocket, setCurrentSocket] = useState(null);

  const [userIsLogged, setUserIsLogged] = useState(false);
  const [messages, setMessages] = useState([]);

  /*
    WebSocket connection.
  */

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_SERVER);
    setCurrentSocket(ws);

    ws.onopen = () => {
      console.log("WEBSOCKET OPEN | STATUS: " + ws.readyState);
    }

    ws.onclose = (event) => {
      setUserIsLogged(false);
      console.log(event);
      alert(event.reason);
      window.location.reload();
    }

    /* 
      Handles all the received messages and
      his rendering.
    */

    ws.onmessage = (data) => {
      console.log("RECEIVED MESSAGE: " + data.data, data.origin);
      const message = JSON.parse(data.data);

      /* 
        Checks if the message is a broadcast
        welcome.
      */

      if (message.user === "admin") {
        setMessages((array) => [...array, {
          username: "admin",
          message: message.message,
          user: message.username,
          reason: message.reason,
          color: message.color
        }]);
        return;
      }

      //When it contains both image and text.
      if (message.image !== null && message.message !== null) {
        const img = React.createElement("img", {
          src: message.image,
          style: { width: 300, height: 'auto' },
        });

        setMessages((array) => [...array, {
          username: message.user,
          message: message.message
        }]);

        setMessages((array) => [...array, {
          username: message.user,
          message: img
        }]);
        //When it only contains image.
      } else if (message.image !== null && message.message == null) {
        const img = React.createElement("img", {
          src: message.image,
          style: { width: 300, height: 'auto' },
        });

        setMessages((array) => [...array, {
          username: message.user,
          message: img
        }]);
        //When it only contains text.
      } else {
        setMessages((array) => [...array, {
          username: message.user,
          message: message.message
        }]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* 
    Sends the username that the connection is
    gonna use.
  */

  const sendUsername = (userChild) => {
    setUser(userChild);

    const sendUser = {
      username: userChild
    }

    if (currentSocket.readyState === WebSocket.OPEN) {
      currentSocket.send(JSON.stringify(sendUser));
      console.log("STATUS: " + currentSocket.readyState, sendUser)
    } else {
      console.log("WebSocket is not open");
      setUserIsLogged(false);
      return;
    }

    setUserIsLogged(true);
  }

  /* 
    Renders the messages on the page.
  */

  const listMessages = messages.map((item, index) => {
    //Broadcast welcome message.
    if (item.username === "admin") {
      console.log("admin");
      const colorUser = item.color;
      if(item.reason === "join") {
        return <li key={index}>
        {item.message} <strong><label style={{color: colorUser}}>{item.user}</label></strong> {"!"}
      </li>
      } else {
        return <li key={index}>
        <strong><label style={{color: colorUser}}>{item.user}</label></strong> {item.message}
      </li>
      }
      
    }
    return <li key={index}>
      <strong>{item.username}</strong>: {item.message}
    </li>
  });

  /*
    This function gets the data from the input and
    sends the message to the WebSocket.
  */

  const handleChildMessage = (data) => {
    //-- DEBUG
    //console.log(data, user);

    //Data to be sended to Websocket.
    const sendData = {
      message: data[0],
      image: data[1]
    }

    if (currentSocket && currentSocket.readyState === WebSocket.OPEN) {
      currentSocket.send(JSON.stringify(sendData));
    } else {
      console.log("WebSocket is not open");
    }
  };

  return (
    <div className="pixel-font">
      <Navbar />
      {!userIsLogged ? (
        <Login onUserLogged={sendUsername} />
      ) : (<div>
        <div className="pl-5 pr-5">
          <Chat list={listMessages} username={user} />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Input onChildMessage={handleChildMessage} />
        </div>
      </div>
      )}
    </div>

  );
}

export default App;
