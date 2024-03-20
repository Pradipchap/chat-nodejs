import Chat from "../components/ChatBox";
import Friends from "../components/Friends";

export default function Front() {
  return (
    <main className="flex">
      <div className="w-[30%]">
        <Friends />
      </div>
      <div className="w-[70%]">
        <Chat />
      </div>
    </main>
  );
}
