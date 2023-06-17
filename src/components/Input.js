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

  /* 
    This function handles all the drawing process and sets
    the default brush color and size.

    --BUG: Changing the color or size of the brush will cause
    the canvas to become blank as the beginning, NEED TO FIX.
  */

  useEffect(() => {
    setClear(false);
    const paperScope = new paper.PaperScope();
    paperScope.setup(canvasRef.current);
    paperScope.activate();

    let path = null;
    const tool = new paperScope.Tool();

    //Triggers when you hold the right click on the mouse.
    tool.onMouseDown = (event) => {
      setDrawing(true);
      path = new paperScope.Path();
      path.strokeColor = brushColor;
      path.strokeWidth = brushSize;
      path.strokeCap = "round";
      path.strokeJoin = "round";
      path.add(event.point);
    };

    //Triggers when to stop holding the right click of the mouse.
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

  /* 
    Handles the logic of the "Save" button on the page.
  */

  const handleSaveImage = () => {
    // Get the data URL of the canvas
    const dataURL = canvasRef.current.toDataURL("image/png");

    // Create a link element to download the image
    const link = document.createElement("a");
    link.download = "myimage.png";
    link.href = dataURL;
    link.click();
  };

  /* 
    Handles the logic of the "Clear" button on the page.
  */

  const handleClearCanvas = () => {
    setClear(true);
    setDrawing(false);
  };

  /* 
    Renders the message of the text input on the page.
  */

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  /* 
    Sends the data (drawing or text) to the parent component
    depending if is only text, both text and drawing or alert the
    user about no input found.
  */

  const handleSend = () => {
    if (message === undefined || message.length === 0) {
  
      //Only drawing and not text found.
      if (drawing !== false) {
        const dataURL = canvasRef.current.toDataURL("image/png");
        props.onChildMessage([null, dataURL, 1]);
      } else {
        //No text and no drawing found.
        alert("¡No has dibujado ni escrito nada!");
      }
    } else {

      //Both text and drawing found.
      if (drawing !== false) {
        const dataURL = canvasRef.current.toDataURL("image/png");
        props.onChildMessage([message, dataURL, 2]);
      } else {

        //Only text found.
        props.onChildMessage([message, null, 3]);
      }
    }

    //Blank the canvas.
    setClear(true);
    setDrawing(false);
    setMessage("");
  };

  return (
    <div className="mb-5">
      <canvas
        ref={canvasRef}
        className={"bg-white border border-secondary"}
        id="canvas"
      ></canvas>
      <div>
        BRUSH SIZE:
        <input
          className="mr-3 ml-2 justify-content-center custom-range w-25"
          type={"range"}
          min={"1"}
          max={"5"}
          value={brushSize}
          onChange={handleBrushSizeChange}
        ></input>
        <span className="">{brushSize}</span>
        <input
          className="btn btn-secondary ml-3"
          type="button"
          value={"🗑️"}
          onClick={handleClearCanvas}
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
          className="form-control border-secondary"
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
        </div>
      </div>
    </div>
  );
};

export default Input;
