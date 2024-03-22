import WriteMessage from "./WriteMessage";
import ChatMessage from "./ChatMessage";
import ChatBoxTopBar from "./ChatBoxTopBar";
import { useMemo } from "react";

export default function Chat() {
  const wsClient = useMemo(() => new WebSocket("ws://localhost:3100"), []);
  
  return (
    <div className="relative bg-blue-950 min-h-screen flex-col flex justify-end">
      <ChatBoxTopBar />
      <div className="absolute top-14 w-full h-[calc(100vh-120px)] flex flex-col gap-5 px-2 overflow-y-auto">
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          primaryChatter={"Pradip Chapagain"}
          secondaryChatter=""
          message="hi k xa "
          time={new Date()}
        />
      </div>
      <WriteMessage />
    </div>
  );
}
