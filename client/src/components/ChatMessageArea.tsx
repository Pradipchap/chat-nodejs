import { Fragment, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../utils/reduxHooks";
import ChatMessage from "./ChatMessage";
import sendSocketMessage from "../../functions/sendSocketMessage";
import { useParams } from "react-router-dom";
import { WsContext } from "../../utils/WsProvider";

export default function ChatMessageArea() {
  const { wsClient } = useContext(WsContext);
  const currentChats = useAppSelector((state) => state.chat.chats);
  const params = useParams();
  const userID = useAppSelector((state) => state.currentUser.userID);
  const secondaryChatter = params.chatterID;
  const [page, setPage] = useState(1);
  const isWsReady = useAppSelector((state) => state.ws.isActive);

  useEffect(() => {
    function getChats() {
      sendSocketMessage({
        sender: userID,
        receiver: secondaryChatter || "",
        type: "getMess",
        data: new Blob([JSON.stringify({ page })]),
        wsClient: wsClient,
      });
    }
    if (isWsReady === true && userID !== "" && secondaryChatter !== "")
      getChats();
  }, [userID, isWsReady, secondaryChatter, page]);

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
