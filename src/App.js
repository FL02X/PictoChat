import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import Input from "./components/Input";
import axios from 'axios';
import "./index.css";
import { BrowserRouter, Route, Router } from "react-router-dom";

function App() {

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState();
  const ws = new WebSocket('ws://localhost:8081/UuAZq-xDWVQaWwLALWiU1')

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:8080/getAllMessages').then((res) => {
        setMessages(res.data.json_agg)
        console.log(res.data.json_agg);
      })
    }
    fetchData();
  }, [])

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

  const listMessages = messages.map((item, index) => (
    <li key={index}>
      {item.username}: {item.message}
    </li>
  ));

  const handleChildMessage = (data) => {
    console.log(data, user);
    const sendData = {
      "message": data,
    }
    ws.send(JSON.stringify(sendData));
    setMessages((array) => [...array, {
      username: user,
      message: data,
    }])
    console.log(sendData);
  };

  return (
      <div className="pixel-font">
        <div className="">
          <Chat list={listMessages} username={user} />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Input onChildMessage={handleChildMessage} />
        </div>
      </div>
  );
}

export default App;
