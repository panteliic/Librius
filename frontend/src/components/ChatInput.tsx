import { SendIcon } from "@/main";
import { Input } from "./ui/input";

function ChatInput() {
  return (
    <div className="p-2 flex justify-between items-center h-16 rounded-md bg-[#00000021]">
      <Input
        type="text"
        placeholder="Ask AI what to read next..."
        className={`border-0 border-secondary focus-visible:outline-none focus-visible:ring-0 shadow-none placeholder:text-foreground text-foreground w-full`}
      />
        <SendIcon width={24} height={24} />
    </div>
  );
}

export default ChatInput;
