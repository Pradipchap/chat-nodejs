import React, { ReactNode, createContext, useEffect, useState } from "react";

const WS_URL = "ws://localhost:3100";

import { useAppSelector } from "./reduxHooks";
import { DetailsObjectInterface } from "../interfaces/dataInterfaces";

export const WsContext = createContext();

export default function WsProvider({ children }: { children: ReactNode }) {
  const userID = useAppSelector((state) => state.currentUser.userID);
  const [wsClient, setWsClient] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    // Set up event listeners for WebSocket connection
    ws.onopen = () => {
      setWsClient(ws);
      console.log("WebSocket connection established.");
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
        ws.send(combinedBlob);
      }
      handleConnection();
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Clean up WebSocket connection on unmount
    return () => {
      ws.close();
    };
  }, []); // This effect runs only once on component mount

  return (
    <WsContext.Provider value={{ wsClient }}>{children}</WsContext.Provider>
  );
}
