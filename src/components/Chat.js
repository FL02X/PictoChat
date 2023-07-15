import { useEffect, useRef } from "react";
import "./Chat.css";

const Chat = (props) => {

/*   const listRef = useRef(null);

  useEffect(() => {
    setTimeout(() => listRef.scrollIntoView({ inline: "center", behavior: 'smooth'}), 0);
    console.log("scroll", listRef)
  }, [props.list]) */

  return (
    <div className="w-100">
      <div className="d-flex justify-content-center align-items-center bg-white">
        <div className="">
          <div className="bg-secondary">
            <div
              className="bg-white border border-primary p-3 mb-3 rounded"
              id="chats"
            >
              {props.list}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
