import { useParams } from "react-router-dom";
import sendSocketMessage from "../../functions/sendSocketMessage";
import { pushMessage } from "../../redux/slices/ChatSlice";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";

export default function WriteMessage({ wsClient }: { wsClient: WebSocket }) {
  const chatter = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const primaryChatter = chatter.primaryChatter;
  const params = useParams();
  const secondaryChatter = params.chatterID;

  function SendMessage(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (wsClient instanceof WebSocket === false) {
        console.log(false);
        return;
      }
      if (event.currentTarget.value.length < 1) return;
      try {
        const text = event.currentTarget.value;
        const nextBlob = new Blob([text]);
        dispatch(pushMessage([{ message: text, isReceiver: false }]));
        sendSocketMessage({
          sender: primaryChatter,
          receiver: secondaryChatter || "",
          type: "message",
          wsClient: wsClient,
          data: nextBlob,
        });
        event.currentTarget.value = "";
      } catch (error) {
        console.log("error is ", error);
      }
    } else {
      return;
    }
  }

  return (
    <form className="w-full gap-5 h-16 flex items-center px-2">
      <button>
        {/* <Icon name="Plus" className="bg-blue-600 p-2 rounded-full" /> */}
      </button>
      <input
        className="flex-1 bg-gray-700 px-5 rounded-full py-3"
        name="message"
        onKeyDown={SendMessage}
        placeholder="Write your Message"
        autoFocus
      />
      {/* <Icon name="Plus" className=" bg-blue-600 p-2 rounded-full" /> */}
      {/* <Icon name="Plus" className=" bg-blue-600 p-2 rounded-full" /> */}
    </form>
  );
}
