import { useEffect, useMemo, useState } from "react";
import Chat from "../components/ChatBox";
import Friends from "../components/Friends";

export default function Front() {
  const [message, setmessage] = useState("");

  const ws = useMemo(() => new WebSocket("ws://localhost:3100"), []);
  ws.addEventListener("open", () => {
    console.log("open websocket");
  });

  useEffect(() => {
    ws.addEventListener("message", (message) => {
      const x = JSON.parse(message.data);
      console.log(x.data.editorContent);
      setmessage(x.data.editorContent);
    });
  }, []);

  return (
    <main className="flex">
      <div className="w-[30%]">
        <Friends />
      </div>
      <div className="w-[70%]">
        <Chat />
        {/* <Video/> */}
      </div>
    </main>
  );
}
