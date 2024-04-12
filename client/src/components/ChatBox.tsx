import WriteMessage from "./WriteMessage";
import ChatBoxTopBar from "./ChatBoxTopBar";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { pushChat, pushMessage, updateChats } from "../../redux/slices/ChatSlice";
import ChatMessageArea from "./ChatMessageArea";
import sendSocketMessage from "../../functions/sendSocketMessage";
import {
  closeCall,
  incomingCall,
  startCall,
  updateCallDetails,
} from "../../redux/slices/CallSlice";
import {
  DetailsObjectInterface,
  FriendBoxInterface,
} from "../../interfaces/dataInterfaces";
import CallIncomingOutgoing from "./CallIncomingOutgoing";
import { useNavigate } from "react-router-dom";

export default function Chat({ wsClient }: { wsClient: WebSocket }) {
  const previewRef = useRef<HTMLVideoElement>();
  const videoRef = useRef<HTMLVideoElement>();
  const readyState = wsClient.readyState;
  const navigator = useNavigate();
  const blobArray = [];

  const userID = useAppSelector((state) => state.currentUser.userID);
  const isCallOpen = useAppSelector((state) => state.call.callStatus);
  const chatter = useAppSelector((state) => state.chat);
  const videoCallers = useAppSelector((state) => state.call);

  const dispatch = useAppDispatch();

  useEffect(() => {
    function handleConnection() {
      console.log("connection established", userID);
      const detailsMessage: DetailsObjectInterface = {
        type: "newUser",
        sender: userID,
        receiver: userID,
      };
      const detailsBlob = new Blob([JSON.stringify(detailsMessage)]);
      const otherBlob = new Blob(["sdfadfasdfasd"]);
      const combinedBlob = new Blob([detailsBlob, otherBlob]);
      console.log("ws initialized");
      wsClient.send(combinedBlob);
    }
    wsClient.addEventListener("open", handleConnection);

    return () => wsClient.removeEventListener("open", handleConnection);
  }, [userID, wsClient, readyState]);

  useEffect(() => {
    async function handleMessage(connection: MessageEvent<any>) {
      console.log("message got", connection.data);
      const parsedData: DetailsObjectInterface = JSON.parse(
        await connection.data.slice(0, 92).text()
      );
      console.log(parsedData);
      const messageBlob = await connection.data.slice(92);
      console.log(await messageBlob.text());
      switch (parsedData.type) {
        case "callGoi": {
          return;
        }
        case "callInc":
          {
            console.log("incoming");
            if (isCallOpen === "ended") {
              console.log("call ended");
              dispatch(closeCall());
              return;
            } else if (isCallOpen === "accepted" || isCallOpen === "ongoing") {
              return;
            } else {
              const callerData: FriendBoxInterface = JSON.parse(
                await messageBlob.text()
              );
              console.log(callerData);
              console.log(parsedData.sender);
              console.log(userID);
              if (parsedData.sender !== videoCallers.secondaryChatter) {
                dispatch(
                  updateCallDetails({
                    primaryChatter: userID,
                    secondaryChatter: parsedData.sender,
                  })
                );
              }
              dispatch(
                incomingCall({
                  name: callerData.username,
                  image: callerData.image,
                })
              );
            }
          }
          break;
        case "callAcc":
          {
            dispatch(startCall());
            navigator("/call");
          }
          break;
        case "callRej":
          {
            dispatch(closeCall());
            console.log("call rejected");
            setTimeout(() => {
              sendSocketMessage({
                sender: userID,
                receiver: parsedData.sender,
                type: "callEnd",
                data: new Blob(),
                wsClient,
              });
            }, 5000);
          }
          break;
        case "callEnd":
          {
            console.log("call ending");
            dispatch(closeCall());
          }
          break;
        case "callTmo":
          {
            console.log("call ending");
            dispatch(closeCall());
          }
          break;
        case "message":
          {
            const message = await messageBlob.text();
            console.log(message);
            console.log("dispatching");
            if (parsedData.sender === chatter.secondaryChatter)
              dispatch(pushMessage([{ message: message, isReceiver: true }]));
          }
          break;
        case "getMess":
          {
            const message = await messageBlob.text();
            const chat: { page: number; messages: [] } = JSON.parse(message);
            console.log("sdf", chat);
            const finalChats = chat.messages.map((item) => {
              const isReceiver = item.sender !== userID;
              return {
                message: item.message,
                isReceiver,
                time: item.datetime,
                id: item._id,
              };
            });
            console.log("finalchats", finalChats);
            console.log(chat.page);
            if (chat.page === 1) dispatch(updateChats(finalChats));
            else dispatch(pushChat(finalChats));
          }
          break;
        default:
          {
            dispatch(closeCall());
          }
          break;
      }
    }
    wsClient.addEventListener("message", handleMessage);
    return () => wsClient.removeEventListener("message", handleMessage);
  }, []);
  useEffect(() => {
    async function handleCallInitiation() {
      if (isCallOpen === "requesting" || isCallOpen === "incoming") {
        // Preload video elements to avoid flickering
        if (videoRef.current) {
          videoRef.current.preload = "auto";
        }

        // Smoothly transition by setting the video source and playing
        if (isCallOpen === "requesting" && videoRef.current) {
          const currentTime = videoRef.current.currentTime;
          const blob = new Blob(blobArray, { type: "video/mp4" });
          videoRef.current.src = window.URL.createObjectURL(blob);
          videoRef.current.currentTime = currentTime;
          videoRef.current.play();
        }
      }
    }

    handleCallInitiation();
  }, [isCallOpen]);

  useEffect(() => {
    async function getUserMedia() {
      console.log("first");
      try {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then((stream) => {
            if (previewRef.current) {
              previewRef.current.srcObject = stream;
              const recorder = new MediaRecorder(stream);
              recorder.ondataavailable = (event) => {
                // videoRef.current.src=new URL.createObjectURL(event.data)
                console.log(event.data);
                sendSocketMessage({
                  sender: userID,
                  receiver: videoCallers.secondaryChatter,
                  data: event.data,
                  wsClient: wsClient,
                  type: "callGoi",
                });
              };
              recorder.start(1000);
            }
          });
      } catch (error) {
        dispatch(closeCall());
        console.log(error);
      }
    }
    if (isCallOpen === "ongoing") getUserMedia();
  }, [isCallOpen]);

  return (
    <div className="relative bg-blue-950 min-h-screen flex-col flex justify-end">
      <ChatBoxTopBar wsClient={wsClient} />
      <p className="text-white">{isCallOpen}</p>
      {isCallOpen === "requesting" || isCallOpen == "incoming" ? (
        <CallIncomingOutgoing callStatus={isCallOpen} wsClient={wsClient} />
      ) : (
        <>
          <ChatMessageArea wsClient={wsClient} />
          <WriteMessage wsClient={wsClient} />
        </>
      )}
    </div>
  );
}
