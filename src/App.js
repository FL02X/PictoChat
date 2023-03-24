import { useState } from "react";
import Chat from "./components/Chat";
import Input from "./components/Input";
import "./index.css"

function App() {

  const [messages, setMessages] = useState([]);
  const listMessages = messages.map((item, index) => <li key={item.toString}>Mensaje {index + 1}: {item}</li>);

  const handleChildMessage = (data) => {
    setMessages(array => [...array, data])
  }

  return (
    <div className="pixel-font">
      <div className="d-flex justify-content-center align-items-center mt-5">
      <Chat list={listMessages}/>
      </div>
      <div className="d-flex justify-content-center align-items-center">
      <Input onChildMessage={handleChildMessage}/>
      </div>
    </div>
  );
}

export default App;
