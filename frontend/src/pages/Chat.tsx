import ChatInput from "@/components/ChatInput";
import Message from "@/components/Message";
import ScrollableFeed from "react-scrollable-feed";

function Chat() {
  const fetchMessages = async () => {
    const response = await fetch("http://localhost:3000/api/protected", {
      credentials: "include", 
    });
    const data = await response.json();
    console.log(data); 
  };

  fetchMessages();

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col w-11/12 lg:w-3/4 xl:w-1/2 m-auto p-3">
      <div className="h-[calc(100%-2.5rem)]">
        <ScrollableFeed className="aScrollBar rounded-md p-2 flex flex-col gap-4">
          <Message sender={true} />
          <Message sender={false} />
          <Message sender={true} />
          <Message sender={false} />
          <Message sender={true} />
          <Message sender={false} />
          <Message sender={true} />
          <Message sender={false} />
          <Message sender={true} />
        </ScrollableFeed>
        <ChatInput />
      </div>
    </div>
  );
}

export default Chat;
