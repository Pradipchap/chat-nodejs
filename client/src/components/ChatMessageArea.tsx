import { Fragment, useEffect, useState } from "react";
import { useAppSelector } from "../../utils/reduxHooks";
import ChatMessage from "./ChatMessage";
import sendSocketMessage from "../../functions/sendSocketMessage";

export default function ChatMessageArea({ wsClient }: { wsClient: WebSocket }) {
  const currentChats = useAppSelector((state) => state.chat.chats);
  const primaryChatter = useAppSelector((state) => state.chat.primaryChatter);
  const secondaryChatter = useAppSelector(
    (state) => state.chat.secondaryChatter
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    function getChats() {
      if (wsClient.readyState === 1 && secondaryChatter !== "")
        sendSocketMessage({
          sender: primaryChatter,
          receiver: secondaryChatter,
          type: "getMess",
          data: new Blob([JSON.stringify({ page })]),
          wsClient: wsClient,
        });
    }
    getChats();
  }, [primaryChatter, secondaryChatter, wsClient.readyState, page]);

  return (
    <div className="top-14 w-full h-[calc(100vh-120px)] flex flex-col gap-5 px-2 py-10 scroll-smooth overflow-y-auto">
      <button
        className="bg-red-600 px-3 py-2 rounded-xl text-white w-max mx-auto"
        onClick={() => {
          setPage((page) => page + 1);
        }}
      >
        older
      </button>
      {currentChats.map((chat) => {
        return (
          <Fragment key={chat.id}>
            <ChatMessage
              isReceiver={chat.isReceiver}
              message={chat.message}
              time={new Date()}
            />
          </Fragment>
        );
      })}
    </div>
  );
}
