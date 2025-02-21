import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import redoraIcon from "../assets/redora.webp";

interface Message {
  message: string;
  sender: boolean;
  isHtml?: boolean; 
}

function Message({ message, sender, isHtml }: Message) {
  return (
    <div
      className={`max-w-4/5 flex gap-4 flex-col ${sender ? "self-end" : ""}`}
    >
      <Avatar className={`w-8 h-8 rounded ${sender && "self-end"}`}>
        <AvatarImage src={sender ? "" : redoraIcon} className="rounded-md" />
        <AvatarFallback className="bg-primary text-primary-foreground rounded-md">
          NP
        </AvatarFallback>
      </Avatar>
      {isHtml ? (
        <div
          className="bg-[#00000021] w-auto px-4 py-2 rounded-md"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      ) : (
        <p className={`${sender && "bg-[#00000021] w-auto px-4 py-2 rounded-md"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Message;
