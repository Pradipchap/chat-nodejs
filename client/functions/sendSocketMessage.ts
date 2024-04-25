interface args {
  sender: string;
  receiver: string;
  type:
    | "newUser"
    | "message"
    | "callGoi"
    | "callInc"
    | "callEnd"
    | "callReq"
    | "callRej"
    | "callTmo"
    | "callAcc"
    | "getMess"
    | "conClos";
  wsClient: WebSocket;
  data: Blob;
}

function sendSocketMessage({ sender, receiver, type, wsClient, data }: args) {
  const detailsBlob = new Blob([
    JSON.stringify({
      type,
      sender,
      receiver,
    }),
  ]);
  console.log(type);
  const combinedBlob = new Blob([detailsBlob, data]);
  wsClient.send(combinedBlob);
}
export default sendSocketMessage;
