import { useEffect, useRef, useState } from "react";
import {paper} from 'paper';

const Input = (props) => {
  const canvasRef = useRef(null);
  const [brushColor, setBrushColor] = useState("black");
  const [brushSize, setBrushSize] = useState(5); 
  const [raster, setRaster] = useState(false); 

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
      path.add(event.point);
    };

    tool.onMouseDrag = function (event) {
      path.add(event.point);
    };

    console.log(raster + '1');

    if(raster !== false) {
      console.log(path);
       var fileName = "custom.svg"
       var url = "data:image/svg+xml;utf8," + encodeURIComponent(paperScope.project.exportSVG({asString:true}));
       console.log(url);

    } else {
      console.log('else');
    }
    
    return () => {
      paperScope.remove();
    };

    },[brushColor, brushSize, raster])

    const handleBrushSizeChange = (event) => {
      setBrushSize(parseInt(event.target.value));
    }

    const handleBrushColorChange = (event) => {
      setBrushColor(event.target.value);
    }

    const handleSaveImage = () => {
      setRaster(true);
      console.log(raster);
    }

  const [message, setMessage] = useState();

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleButton = () => {
    props.onChildMessage(message);
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
      <button onClick={handleButton}>Enviar</button>
      <button onClick={handleSaveImage}>Save</button>
    </div>
  );
};

export default Input;
