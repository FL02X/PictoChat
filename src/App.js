import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import Input from "./components/Input";
import axios from 'axios';
import "./index.css";

function App() {
  const ws = new WebSocket('ws://localhost:8081/UuAZq-xDWVQaWwLALWiU1')

  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);

  /* 
    This function sends a request to get all the  
    messages history along with the user who posted. 
  */

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:8080/getAllMessages').then((res) => {
        setMessages(res.data.json_agg)
        console.log(res.data.json_agg);
      })
    }
    fetchData();
  }, [])

  /*
    WebSocket connection.
  */

  useEffect(() => {
    ws.onopen = () => {
      console.log('WebSocket open')
    }

    ws.onmessage = (data) => {
      const message = JSON.parse(data.data);
      setUser(message.user)
      console.log(message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      "message": data,
    }
    ws.send(JSON.stringify(sendData));

    //Renders the data on the page.
    setMessages((array) => [...array, {
      username: user,
      message: data,
    }])

    //-- DEBUG
    console.log(sendData);
  };

  return (
    <div className="pixel-font">
      <div className="pl-5 pr-5">
        <Chat list={listMessages} username={user} />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Input onChildMessage={handleChildMessage} />
      </div>
    </div>
  );
}

export default App;
