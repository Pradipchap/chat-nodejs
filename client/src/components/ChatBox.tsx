import WriteMessage from "./WriteMessage";
import ChatMessage from "./ChatMessage";
import ChatBoxTopBar from "./ChatBoxTopBar";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { updateChats } from "../../redux/slices/ChatSlice";
import ChatMessageArea from "./ChatMessageArea";

export default function Chat() {
  const userID = useAppSelector((state) => state.currentUser.userID);
  const dispatch = useAppDispatch();
  const wsClient = useMemo(() => new WebSocket(`ws://localhost:3100`), []);
  useEffect(() => {
    function handleConnection() {
      console.log("connection established", userID);
      wsClient.send(JSON.stringify({ type: "newUser", userID }));
    }

    wsClient.addEventListener("open", handleConnection);

    return () => wsClient.removeEventListener("open", handleConnection);
  }, [userID]);

  useEffect(() => {
    function handleMessage(connection: MessageEvent<any>) {
      console.log("message got", connection.data);
      const parsedData = JSON.parse(connection.data);
      console.log("dispatching");
      dispatch(updateChats({ message: parsedData.message, isReceiver: true }));
    }
    wsClient.addEventListener("message", handleMessage);
    return () => wsClient.removeEventListener("message", handleMessage);
  }, []);
  

  return (
    <div className="relative bg-blue-950 min-h-screen flex-col flex justify-end">
      <ChatBoxTopBar />
      <ChatMessageArea />
      <WriteMessage wsClient={wsClient} />
    </div>
  );
}
