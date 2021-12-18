import { useMoralis } from "react-moralis";
import { useState } from "react";
const SendMessage = ({ endofMessagesRef }) => {
  const { user, Moralis } = useMoralis();
  const [message, setMessages] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();

    if (!message) return;

    const Messages = Moralis.Object.extend("Messages");

    const messages = new Messages();

    messages
      .save({
        messages: message,
        username: user.getUsername(),
        ethAddress: user.get("ethAddress"),
      })
      .then(
        (messages) => {
        //   console.log(messages);
        },
        (err) => {
          console.log(err.messages);
        }
      );

    endofMessagesRef.current.scrollIntoView({ behavior: "smooth" });

    setMessages("");
  };
  return (
    <form className="flex fixed bottom-10 bg-black opacity-80 w-11/12 py-4 px-6 max-w-2xl shadow-xl border-4 border-blue-400  rounded-full">
      <input
        className=" flex-grow outline-none bg-transparent text-white placeholder-gray-500 pr-5"
        type="text"
        value={message}
        onChange={(e) => setMessages(e.target.value)}
        placeholder={`Enter a Message ${user.getUsername()}...`}
      />

      <button
        type="submit"
        onClick={sendMessage}
        className="font-bold text-pink-600"
      >
        Send
      </button>
    </form>
  );
};

export default SendMessage;
