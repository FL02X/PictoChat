import { useEffect, useState } from "react";

const Input = (props) => {
  const [message, setMessage] = useState();
  //const [finalMessage, setFinalMessage] = useState();

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleButton = () => {
    //setFinalMessage(message);
    props.onChildMessage(message);
  };

  return (
    <div>
      <input type="text" value={message} onChange={handleChange}></input>
      <button onClick={handleButton}>Enviar</button>
    </div>
  );
};

export default Input;
