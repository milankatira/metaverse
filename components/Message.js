import { useMoralis } from "react-moralis";
import Avatar from "./Avatar";
import TimeAgo from "timeago-react";
const Message = ({ messages }) => {
  const { user } = useMoralis();

  const isUserMessage = messages.get("ethAddress") === user.get("ethAddress");
  return (
    <div
      className={`flex items-end space-x-2 relative ${
        isUserMessage ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`relative h-8 w-8 ${isUserMessage && "order-last ml-2"}`}>
        <Avatar username={messages.get("username")} />
      </div>
      <div
        className={`flex space-x-4 p-3 rounded-lg ${
          isUserMessage
            ? "rounded-br-none bg-pink-300"
            : "rounded-br-none bg-blue-300"
        }`}
      >
        <p>{messages.get("messages")}</p>
      </div>

      <p
        className={`absolute -bottom-5 text-xs ${
          isUserMessage ? "text-pink-300" : "text-blue-300"
        }`}
      >
        {messages.get("username")}
      </p>
      <TimeAgo
        className={`text-[10px] italic text-gray-400 ${
          isUserMessage && "order-last pr-1"
        }`}
        datetime={messages.get("createdAt")}
      />
    </div>
  );
};

export default Message;
