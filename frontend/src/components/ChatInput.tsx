import { Input } from "./ui/input";

function ChatInput() {
  return (
    <div className="border-[#00000011]  py-2 flex justify-between items-center h-16">
      <Input
        type="text"
        placeholder="Search book..."
        className={`border-0 border-secondary focus-visible:outline-none focus-visible:ring-0 text-accent-foreground shadow-none`}
      />
    </div>
  );
}

export default ChatInput;
