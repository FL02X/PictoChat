const Chat = (props) => {
  return (
    <div className="w-50">
      <h1 className="text-center">Sala de chat 1</h1>
      <div className="bg-secondary">
        <div className="bg-white border border-primary p-3 mb-3 rounded">
          ...
          {props.list}
        </div>
      </div>
    </div>
  );
};

export default Chat;
