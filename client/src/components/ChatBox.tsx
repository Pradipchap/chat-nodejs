import WriteMessage from "./WriteMessage";
import ChatMessage from "./ChatMessage";
import ChatBoxTopBar from "./ChatBoxTopBar";

export default function Chat() {
  return (
    <div className="relative bg-blue-900 min-h-screen flex-col flex justify-end">
      <ChatBoxTopBar />
      <div className="absolute top-14 w-full h-[calc(100vh-120px)] flex flex-col gap-5 px-2 overflow-y-auto">
        <ChatMessage
          username={"Pradip Chapagain"}
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          username={"Pradip Chapagain"}
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          username={"Pradip Chapagain"}
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          username={"Pradip Chapagain"}
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          username={"Pradip Chapagain"}
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          username={"Pradip Chapagain"}
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          username={"Pradip Chapagain"}
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          username={"Pradip Chapagain"}
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          username={"Pradip Chapagain"}
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          username={"Pradip Chapagain"}
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          username={"Pradip Chapagain"}
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          username={"Pradip Chapagain"}
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          username={"Pradip Chapagain"}
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          username={"Pradip Chapagain"}
          message="hi k xa "
          time={new Date()}
        />
        <ChatMessage
          username={"Pradip Chapagain"}
          message="hi k xa "
          time={new Date()}
        />
      </div>
      <WriteMessage />
    </div>
  );
}
