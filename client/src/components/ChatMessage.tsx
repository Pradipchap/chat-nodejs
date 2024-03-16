import { MessageInterface } from "../../interfaces/dataInterfaces";

export default function ChatMessage({
  message,
  time,
  username,
}: MessageInterface) {
  return (
    <div className=" h-12 w-max flex gap-2 items-center">
      <div className="w-10 h-10 bg-red-600 rounded-full"></div>
      <div>
        {" "}
        <p className="rounded-2xl px-2 py-1 rounded-tr-none bg-gray-500">
          {message}
        </p>
      </div>
    </div>
  );
}
