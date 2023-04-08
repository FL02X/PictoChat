import { useEffect, useRef, useState } from "react";
import { paper } from "paper";

const Input = (props) => {
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [brushColor, setBrushColor] = useState("black");
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    const paperScope = new paper.PaperScope();
    paperScope.setup(canvasRef.current);
    paperScope.activate();

    let path = null;
    const tool = new paperScope.Tool();

    tool.onMouseDown = (event) => {
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
  }, [brushColor, brushSize]);

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

  const [message, setMessage] = useState();

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleText = () => {
    props.onChildMessage(message);
  };

  const handleImage = () => {
    const dataURL = canvasRef.current.toDataURL("image/png");

    const img = new Image();
    img.src = dataURL;
    img.alt = "Drawing";
    img.onload = () => {
      setImageData(img);
    };

    props.onChildMessage(imageData);
  };

  const log = () => {
    //console.log(Img);
  };

  return (
    <div>
      <canvas ref={canvasRef} className={"bg-white"}></canvas>
      <div>
        BRUSH SIZE:
        <input
          type={"range"}
          min={"1"}
          max={"50"}
          value={brushSize}
          onChange={handleBrushSizeChange}
        ></input>
        {brushSize}
      </div>
      <div>
        BRUSH COLOR:
        <input
          type={"color"}
          value={brushColor}
          onChange={handleBrushColorChange}
        ></input>
      </div>
      <input type="text" value={message} onChange={handleChange}></input>
      <button onClick={handleText}>Enviar</button>
      <button onClick={handleImage}>Enviar imagen</button>
      <button onClick={handleSaveImage}>Save</button>
      <button onClick={log}>Log</button>
    </div>
  );
};

export default Input;
