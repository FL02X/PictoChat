import { useEffect, useRef, useState } from "react";
import React from "react";
import Login from "./routes/Login";
import Chat from "./components/Chat";
import Input from "./components/Input";
import Navbar from "./components/Navbar";
import "./index.css";
import joinAudio from './sounds/join.mp3'
import leaveAudio from './sounds/leave.mp3';
import invalidAudio from './sounds/invalid.mp3'
import receivedJiggle from './sounds/messageJiggle.mp3'
import messageJiggle from './sounds/messageSent.mp3'

function App() {
  const [currentSocket, setCurrentSocket] = useState(null);
  const [user, setUser] = useState();

  const [userIsLogged, setUserIsLogged] = useState(false);
  const [messages, setMessages] = useState([]);
  const audioLeave = new Audio(leaveAudio);
  const audioInvalid = new Audio(invalidAudio);
  const audioReceived = new Audio(receivedJiggle);
  const audioSent = new Audio(messageJiggle);
  const audioJoin = new Audio(joinAudio);

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
      audioInvalid.play();
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
          username: message.username,
          message: message.message,
          user: message.user,
          reason: message.reason,
          color: message.color
        }]);
        audioReceived.play();
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
        if (message.user === user) {
          audioSent.play();
        } else {
          audioReceived.play();
        }
        //When it only contains text.
      } else {
        setMessages((array) => [...array, {
          username: message.user,
          message: message.message
        }]);
        if (message.user === user) {
          audioSent.play();
        } else {
          audioReceived.play();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* 
    Sends the username that the connection is
    gonna use.
  */

  const sendUsername = (userChild) => {
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
    setUser(userChild);
    audioJoin.play();
    console.log(user);
  }

  /* 
    Focus on the last item on the
    list.
  */
  const listRef = useRef(null);

  useEffect(() => {
    setTimeout(() => listRef.current.scrollIntoView({ inline: "center", behavior: 'smooth'}), 0);
    console.log(listRef);
  }, [messages.length])

  /* 
    Renders the messages on the page.
  */

  const listMessages = messages.map((item, index) => {

    /* 
      NEED TO FIX:
      Cant put join and leave sounds, because .map
      renders every single one of the sounds. 
      Example: 5 admin messages, 5 sounds at the same
      time every time a new entry to .map is made.
    */

    //Broadcast welcome message.
    if (item.user === "admin") {
      const colorUser = item.color;
      if (item.reason === "join") {
        console.log("join")
        return <li ref={listRef} key={index}>
          {item.message} <strong><label style={{ color: colorUser }}>{item.username}</label></strong> {"!"}
        </li>

      } else {
        console.log("leave");
        return <li ref={listRef} key={index}>
          <strong><label style={{ color: colorUser }}>{item.username}</label></strong> {item.message}
        </li>
      }

    } else {
      return <li ref={listRef} key={index}>
        <strong>{item.username}</strong>: {item.message}
      </li>
    }

  });

/*   useEffect(() => {
    setTimeout(() => listMessages[listMessages.length - 1].scrollIntoView({ inline: "center", behavior: 'smooth'}), 0);
    console.log("scroll", listMessages)
  }, [listMessages]) */

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
          <Chat list={listMessages}/>
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
