import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAppSelector } from "./reduxHooks";
import { DetailsObjectInterface } from "../interfaces/dataInterfaces";
import sendSocketMessage from "../functions/sendSocketMessage";

const WS_URL = "ws://localhost:3100";

export const WsContext = createContext();

export default function WsProvider({ children }: { children: ReactNode }) {
  const userID = useAppSelector((state) => state.currentUser.userID);
  const { secondaryChatter } = useAppSelector((state) => state.chat);
  const [wsClient, setWsClient] = useState<WebSocket | null>(null);

  const handleConnection = (ws: WebSocket) => {
    console.log("connection established", userID);
    const otherBlob = new Blob(["sdfadfasdfasd"]);
    if (ws.readyState !== WebSocket.OPEN) return;
    try {
      sendSocketMessage({
        sender: userID,
        receiver: userID,
        type: "newUser",
        wsClient: ws,
        data: otherBlob,
      });
    } catch (error) {
      console.log(error);
    }
    console.log("success");

    console.log("ws initialized");
  };

  useEffect(() => {
    if (userID && secondaryChatter && !wsClient) {
      const ws = new WebSocket(WS_URL);
      ws.addEventListener("open", () => {
        console.log("WebSocket connection established.");
        setWsClient(ws);
        handleConnection(ws);
      });
      ws.onclose = () => {
        console.log("WebSocket connection closed.");
        setWsClient(null);
      };
      ws.onerror = (error) => {
        setWsClient(null);
        console.error("WebSocket error:", error);
      };

      return () => {
        ws.close();
      };
    }
  }, [userID, secondaryChatter]);

  return (
    <WsContext.Provider value={{ wsClient }}>{children}</WsContext.Provider>
  );
}
