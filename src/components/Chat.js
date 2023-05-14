import "./Chat.css";

const Chat = (props) => {
  return (
    <div className="w-100">
      <div className="pb-1 mb-4 border-bottom" id="top">
        <h1 className="text-center pt-1" id="salaText">
          Sala de chat 1
        </h1>
      </div>
      <div className="d-flex justify-content-center align-items-center bg-white">
        <div className="w-50">
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
