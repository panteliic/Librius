import ChatInput from "@/components/ChatInput";
import Message from "@/components/Message";
import ScrollableFeed from "react-scrollable-feed";
function Chat() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col w-11/12 lg:w-3/4 xl:w-1/2 m-auto p-3">
      <div className="h-[calc(100%-2.5rem)] ">
        {/*<h1 className="text-popover-foreground text-3xl absolute left-1 top-1">Readora</h1>*/}
        <ScrollableFeed className=" ScrollBar rounded-md p-2 flex flex-col gap-4 ">
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
