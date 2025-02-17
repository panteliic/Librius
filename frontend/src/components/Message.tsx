import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import redoraIcon from "../assets/redora.webp";
interface Message {
  message: string;
  sender: boolean;
}

function Message(props: Message) {
  return (
    <div
      className={`max-w-4/5 flex gap-4 flex-col ${
        props.sender ? "  self-end" : ""
      }`}
    >
      <Avatar className={`w-8 h-8 rounded ${props.sender && " self-end"}`}>
        <AvatarImage
          src={props.sender ? "" : redoraIcon}
          className=" rounded-md"
        />
        <AvatarFallback className="bg-primary text-primary-foreground rounded-md">
          NP
        </AvatarFallback>
      </Avatar>
      <p
        className={`${
          props.sender && "bg-[#00000021] w-auto px-4 py-2 rounded-md"
        }`}
      >
        {props.message}
      </p>
    </div>
  );
}

export default Message;
