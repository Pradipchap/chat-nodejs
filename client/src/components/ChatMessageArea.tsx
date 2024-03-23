import { useAppSelector } from "../../utils/reduxHooks";
import ChatMessage from "./ChatMessage";

export default function ChatMessageArea() {
  const currentChats = useAppSelector((state) => state.chat.chats);
  return (
    <div className="top-14 w-full h-[calc(100vh-120px)] flex flex-col gap-5 px-2 overflow-y-auto">
      {currentChats.map((chat) => {
        return (
          <ChatMessage
						isReceiver={chat.isReceiver}
            message={chat.message}
            time={new Date()}
          />
        );
      })}
    </div>
  );
}
