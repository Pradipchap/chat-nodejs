import { updateChats } from "../../redux/slices/ChatSlice";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";

interface SendMessageInterface {
  message: string;
  sender: string;
  receiver: string;
  type: "message" | "newUser";
}

export default function WriteMessage({ wsClient }: { wsClient: WebSocket }) {
  const chatter = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const primaryChatter = chatter.primaryChatter;
  const secondaryChatter = chatter.secondaryChatter;

  function SendMessage(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      const text = event.currentTarget.value;
      wsClient.send(
        JSON.stringify({
          message: text,
          type: "message",
          sender: primaryChatter,
          receiver: secondaryChatter,
        })
      );
      dispatch(updateChats({ message: text, isReceiver: false }));
      event.currentTarget.value=""
    } else {
      return;
    }
  }

  return (
    <form className="absolute bottom-0 w-full gap-5 h-16 flex items-center px-2">
      <button>
        {/* <Icon name="Plus" className="bg-blue-600 p-2 rounded-full" /> */}
      </button>
      <textarea
        className="flex-1 bg-gray-700 px-5 rounded-full py-3"
        name="message"
        rows={1}
        onKeyDown={SendMessage}
        placeholder="Write your Message"
        autoFocus
      />
      {/* <Icon name="Plus" className=" bg-blue-600 p-2 rounded-full" /> */}
      {/* <Icon name="Plus" className=" bg-blue-600 p-2 rounded-full" /> */}
    </form>
  );
}
