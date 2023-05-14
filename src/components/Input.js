import { useEffect, useRef, useState } from "react";
import React from "react";
import { paper } from "paper";
import "./Input.css";

const Input = (props) => {
  const canvasRef = useRef(null);
  const [message, setMessage] = useState();
  const [brushColor, setBrushColor] = useState("black");
  const [brushSize, setBrushSize] = useState(5);
  const [drawing, setDrawing] = useState(false);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    setClear(false);
    const paperScope = new paper.PaperScope();
    paperScope.setup(canvasRef.current);
    paperScope.activate();

    let path = null;
    const tool = new paperScope.Tool();

    tool.onMouseDown = (event) => {
      setDrawing(true);
      path = new paperScope.Path();
      path.strokeColor = brushColor;
      path.strokeWidth = brushSize;
      path.strokeCap = "round";
      path.strokeJoin = "round";
      path.add(event.point);
      //path.dashArray = [10, 0];  //Extra
    };

    tool.onMouseDrag = function (event) {
      path.add(event.point);
    };
  }, [brushColor, brushSize, clear]);

  const handleBrushSizeChange = (event) => {
    setBrushSize(parseInt(event.target.value));
  };

  const handleBrushColorChange = (event) => {
    setBrushColor(event.target.value);
  };

  const handleSaveImage = () => {
    // Get the data URL of the canvas
    const dataURL = canvasRef.current.toDataURL("image/png");

    // Create a link element to download the image
    const link = document.createElement("a");
    link.download = "myimage.png";
    link.href = dataURL;
    link.click();
  };

  const handleClear = () => {
    setClear(true);
    setDrawing(false);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (message == undefined || message.length == 0) {
      if (drawing !== false) {
        console.log("1");
        const dataURL = canvasRef.current.toDataURL("image/png");
        const img = React.createElement("img", { src: dataURL });
        props.onChildMessage(img);
      } else {
        alert("¡No has dibujado ni escrito nada!");
      }
    } else {
      if (drawing !== false) {
        console.log("2");
        const dataURL = canvasRef.current.toDataURL("image/png");
        const img = React.createElement("img", {
          src: dataURL,
          style: "width: 100, height: auto",
        });
        props.onChildMessage(img);
        props.onChildMessage(message);
      } else {
        console.log("3");
        props.onChildMessage(message);
      }
    }

    setClear(true);
    setDrawing(false);
  };

  const log = () => {
    //console.log(Img);
  };

  return (
    <div className="mb-5">
      <canvas
        ref={canvasRef}
        className={"bg-white border"}
        id="canvas"
      ></canvas>
      <div>
        BRUSH SIZE:
        <input
          className="mr-3 ml-2 justify-content-center"
          type={"range"}
          min={"1"}
          max={"50"}
          value={brushSize}
          onChange={handleBrushSizeChange}
        ></input>
        <span className="">{brushSize}</span>
        <input
          className="btn btn-warning ml-3"
          type="button"
          value={"🗑️"}
          onClick={handleClear}
        ></input>
      </div>
      <div>
        BRUSH COLOR:
        <input
          className="ml-2"
          type={"color"}
          value={brushColor}
          onChange={handleBrushColorChange}
        ></input>
      </div>
      <div className="input-group mt-3">
        <input
          className="form-control"
          type="text"
          value={message}
          onChange={handleChange}
        ></input>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" onClick={handleSend}>
            Enviar
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={handleSaveImage}
          >
            Save
          </button>
          <button className="btn btn-outline-secondary" onClick={log}>
            Log
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
