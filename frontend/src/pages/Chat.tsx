import ChatInput from "@/components/ChatInput";
import ScrollableFeed from "react-scrollable-feed";
function Chat() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col w-11/12 lg:w-3/4 xl:w-1/2 m-auto py-10 " >
      <div className="h-[calc(100%-2rem)] ">
        <ScrollableFeed className=" ScrollBar rounded-md ">
          
        </ScrollableFeed>
      </div>
      <ChatInput />
    </div>
  );
}

export default Chat;
