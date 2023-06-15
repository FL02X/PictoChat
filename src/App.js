import { useEffect, useState } from "react";
import React from "react";
import Login from "./routes/Login";
import Chat from "./components/Chat";
import Input from "./components/Input";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);

  const [userIsLogged, setUserIsLogged] = useState(false);
  const [messages, setMessages] = useState([]);

  /*
    WebSocket connection.
  */

    useEffect(() => {
      let ws = new WebSocket(`ws://localhost:8081/${user}`);

      ws.onopen = () => {
        console.log(ws.readyState)
        console.log(console.log(user) + "aa");
      }
    
      ws.onmessage = (data) => {
        console.log(data.data, data.origin);
        const message = JSON.parse(data.data);
    
        //Contains image and text.
        if (message.image !== null && message.message !== null) {
          console.log("1", user)
          const img = React.createElement("img", {
            src: message.image,
            style: { width: 100, height: 'auto' },
          });
    
          setMessages((array) => [...array, {
            username: message.user,
            message: message.message
          }]);
    
          setMessages((array) => [...array, {
            username: message.user,
            message: img
          }]);
          //Only contains image.
        } else if (message.image !== null && message.message == null) {
          console.log("2", user)
          const img = React.createElement("img", {
            src: message.image,
            style: { width: 100, height: 'auto' },
          });
    
          setMessages((array) => [...array, {
            username: message.user,
            message: img
          }]);
          //Only contains text.
        } else {
          console.log("3", user);
          setMessages((array) => [...array, {
            username: message.user,
            message: message.message
          }]);
        }
      }

      const sendMessage = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(sendData));
        } else {
          console.log("WebSocket is not open");
        }
      }
    }, [user])

  


  // eslint-disable-next-line react-hooks/exhaustive-deps


  /* 
    Renders the messages on the page.
  */

  const listMessages = messages.map((item, index) => (
    <li key={index}>
      {item.username}: {item.message}
    </li>
  ));

  /*
    This function gets the data (text) and
    sends the message to the WebSocket and renders
    the message on the page.    
  */

  const handleChildMessage = (data) => {
    //-- DEBUG
    console.log(data, user);

    //Sends the data to Websocket.
    const sendData = {
      message: data[0],
      image: data[1]
    }

    sendMessage(sendData);

    //Renders the data on the page.

    /*    if (data.includes(1)) {
         console.log(1)
         const img = React.createElement("img", {
           src: data[1],
           style: { width: 100, height: 'auto' },
         });
   
         setMessages((array) => [...array, {
           username: user,
           message: img
         }])
       } else if (data.includes(2)) {
         console.log(2)
         const img = React.createElement("img", {
           src: data[1],
           style: { width: 100, height: 'auto' },
         });
   
         setMessages((array) => [...array, {
           username: user,
           message: img
         }])
         setMessages((array) => [...array, {
           username: user,
           message: [0]
         }])
       } else {
         console.log(3)
         setMessages((array) => [...array, {
           username: user,
           message: [0]
         }])
       }
   
   
   
       //-- DEBUG
       console.log(sendData); */
  };

  /* 
    This function gets the name introduced on
    the Login component.
  */

  const handleUserLogged = (user) => {
    setUser(user);
    setUserIsLogged(true);
  }

  return (
    <div className="pixel-font">
      <Navbar />
      {!userIsLogged ? (
        <Login onUserLogged={handleUserLogged} />
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
