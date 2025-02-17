import { ChatInput } from "@/components/ChatInput";
import Message from "@/components/Message";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";

function Chat() {
  const messages = useSelector((state: RootState) => state.message.messages);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col w-11/12 lg:w-3/4 xl:w-1/2 m-auto p-3">
      <div className="h-[calc(100%-2.5rem)]">
        <ScrollableFeed className="ScrollBar rounded-md p-2 flex flex-col gap-4">
          {messages.map((msg, index) => (
            <Message key={index} {...msg} />
          ))}
        </ScrollableFeed>
        <ChatInput />
      </div>
    </div>
  );
}

export default Chat;
