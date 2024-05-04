import {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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

  const DivRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (DivRef.current) DivRef.current.scrollTop = DivRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    function getChats() {
      console.log('retrieving')
      console.log(secondaryChatter)
      console.log(wsClient)
      sendSocketMessage({
        sender: userID,
        receiver: secondaryChatter || "",
        type: "getMess",
        data: new Blob([JSON.stringify({ page })]),
        wsClient: wsClient,
      });
    }
    if (
      isWsReady === true &&
      userID !== "" &&
      secondaryChatter !== "" &&
      wsClient instanceof WebSocket
    )
      getChats();
      else{
        console.log(isWsReady,userID,secondaryChatter,wsClient instanceof WebSocket)
      }
  }, [userID, isWsReady, secondaryChatter, page, wsClient]);

  useEffect(() => {
    console.log(wsClient)
  }, [wsClient])
  

  // useEffect(() => {
  //   function onIntersection(entries: IntersectionObserverEntry[]) {
  //     if (entries.length > 0) {
  //       if (entries[0].isIntersecting) {
  //         console.log("paginating");
  //         setPage((page) => page + 1);
  //         console.log(page);
  //         return () => intersection.disconnect();
  //       }
  //     }
  //   }

  //   const intersection = new IntersectionObserver(onIntersection);

  //   if (intersection && currentChats.length > 0 && spinnerRef.current)
  //     intersection.observe(spinnerRef.current as Element);

  //   return () => {
  //     intersection.disconnect();
  //   };
  // }, [currentChats]);

  return (
    <div className="top-14 w-full h-[calc(100vh-120px)] bg-green-600 flex flex-col-reverse gap-5 px-2 py-10 scroll-smooth overflow-y-auto">
      <div ref={DivRef} className="w-full h-max flex flex-col gap-5">
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
      {/* <div ref={spinnerRef} className="w-full flex justify-center">
        <Icon name="Loading" className="animate-spin" />
      </div> */}
      {currentChats.length > 10 && (
        <button
          onClick={() => setPage((page) => page + 1)}
          className=" self-center bg-red-800 rounded-full px-3 py-1 text-white w-max border border-red-900"
        >
          older
        </button>
      )}
    </div>
  );
}
