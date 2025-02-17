import { SendIcon } from "@/main";
import { Input } from "./ui/input";
import { addMessage } from "@/store/messageSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export function ChatInput() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSendMessage = async () => {
    if (input.trim() === "" || isLoading) return;

    // Dispatch the user's message to the Redux store
    dispatch(addMessage({ message: input, sender: true }));
    setInput(""); // Clear the input field
    setIsLoading(true); // Set loading state to true

    try {
      // Send the user's input to the API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/prompt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch response from AI");
      }
      console.log(response);

      const data = await response.text();

      // Assuming the AI response is stored in data.response.text or adjust according to the API response format
      const aiResponse = data|| "Sorry, I couldn't generate a response.";

      // Dispatch the AI's response to the Redux store
      dispatch(addMessage({ message: aiResponse, sender: false }));
    } catch (error) {
      console.error("Error communicating with the API", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-2 flex justify-between items-center h-16 rounded-md bg-[#00000021]">
      <Input
        type="text"
        placeholder="Ask AI what to read next..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="border-0 border-secondary focus-visible:outline-none focus-visible:ring-0 shadow-none placeholder:text-foreground text-foreground w-full"
      />
      <SendIcon
        width={24}
        height={24}
        onClick={handleSendMessage}
        className={`cursor-pointer ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}
