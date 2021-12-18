import { ByMoralis, useMoralis, useMoralisQuery } from "react-moralis";
import SendMessage from "./SendMessage";
import Message from "./Message";
import { useRef } from "react";
const Messages = () => {
  const { user } = useMoralis();
  const endofMessagesRef = useRef(null);
  const { data, loading, error } = useMoralisQuery(
    "Messages",
    (query) =>
      query
        .ascending("createdAt")
        .greaterThan(
          "createdAt",
          new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
        ),
    [],
    {
      live: true,
    }
  );
  return (
    <div className="pb-56">
      <div className="my-5">
        <ByMoralis
          style={{ marginLeft: "auto", marginRight: "auto" }}
          variant="dark"
        />
      </div>

      <div className="space-y-10 p-4">
        {data.map((messages) => {
            return(

                <Message key={messages.id} messages={messages} />
            )
        })}
      </div>

      <div className="flex justify-center">
        <SendMessage endofMessagesRef={endofMessagesRef} />
      </div>

      <div ref={endofMessagesRef} className="text-gray-300 text-center mt-5">
        <p>You're up to date {user.getUsername()}!</p>
      </div>
    </div>
  );
};

export default Messages;
