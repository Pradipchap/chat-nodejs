const http = require("http");
const port = 3100;
const hostname = "localhost";
const express = require("express");
const app = express();
const routes = require("./routes/routes");
const cors = require("cors");
const { WebSocketServer, WebSocket } = require("ws");
const { randomUUID } = require("crypto");
const connectToDB = require("./utils/database");
const User = require("./models/UserModel");
const saveMessage = require("./utils/worker");
const Convo = require("./models/ConvoModel");

app.use(cors());
app.use("/api", routes);
app.use(express.json());
const server = http.createServer(app);

const wsServer = new WebSocketServer({ server });

server.listen(port, (req, res) => {
  console.log(`server started at http://}`);
});

const clients = {};
// I'm maintaining all active users in this object
const users = {};
// The current editor content is maintained here.
let editorContent = null;
// User activity history.
let userActivity = [];

// Event types
const typesDef = {
  NEW_USER: "newUser",
  MESSAGE: "message",
  VIDEO: "callGoi",
  CALL_REQ: "callReq",
  CALL_END: "callend",
  CALL_REJ: "callRej",
  CALL_ACC: "callAcc",
  CALL_INC: "callInc",
  CALL_TIMEOUT: "callTmo",
  GET_MESSAGES:"getMess"
};

function broadcastMessage(sender, receiver, message, connectionId, type) {
  // console.log("receiver id is", receiver);
  // We are sending the current data to all connected clients

  try {
    if (receiver in users) {
      if ("connection" in users[receiver]) {
        console.log("type broadcast", type);
        console.log("connection exists");
        users[receiver].connection.send(message);
      }
    } else {
      console.log("receiver not found");
    }
  } catch (error) {
    console.log("error is", error);
  }
}

async function handleMessage(message, connectionId, connection) {
  const detailsBlob = message.slice(0, 92);
  const messageBlob = message.slice(92);
  // const dataFromClient=JSON.parse(await detailsBlob.text())
  // console.log("message is",detailsBlob.toString());
  const dataFromClient = JSON.parse(detailsBlob.toString());
  const type = dataFromClient.type;
  console.log("type is", type);
  const messageString=messageBlob.toString();
  const sender = dataFromClient.sender;
  const receiver = dataFromClient.receiver;
  switch (type) {
    case typesDef.NEW_USER: {
      const userID = dataFromClient.sender;
      console.log("user id", userID);
      users[userID] = { ...dataFromClient, connection, connectionId };
      console.log("user");
      // json.data = { users, userActivity };
      break;
    }
    case typesDef.MESSAGE: {
      broadcastMessage(sender, receiver, message, connectionId, "message");
      await connectToDB();
      const documentID =
      sender < receiver ? sender + receiver : receiver + sender;
    const doesConversationExists = await Convo.exists({users:documentID})
    if(!doesConversationExists){
      await Convo.create({users:documentID})
    }
    await Convo.updateOne({users:documentID},{$push:{messages:{message:messageString,sender}}})
      break;
    }
    case typesDef.VIDEO: {
      console.log("video broadcasting");
      broadcastMessage(sender, receiver, message, connectionId, typesDef.VIDEO);
      break;
    }
    case typesDef.CALL_REQ:
      {
        console.log("requesting");
        try {
          await connectToDB();
          await User.findById(sender).then(async (callStarter) => {
            const detail = new Blob([
              JSON.stringify({
                type: typesDef.CALL_INC,
                sender: sender,
                receiver: receiver,
              }),
            ]);
            const requestData = new Blob([JSON.stringify(callStarter)]);
            const combinedData = await new Blob([
              detail,
              requestData,
            ]).arrayBuffer();
            // console.log("users are", users);
            broadcastMessage(
              sender,
              receiver,
              combinedData,
              connectionId,
              typesDef.CALL_INC
            );
          });
        } catch (error) {}
      }
      break;
    case typesDef.CALL_REJ:
      {
        console.log("backend call is rejecting");
        broadcastMessage(
          sender,
          receiver,
          message,
          connectionId,
          typesDef.CALL_REJ
        );
      }
      break;
    case typesDef.CALL_TIMEOUT:
      {
        broadcastMessage(
          sender,
          receiver,
          message,
          connectionId,
          typesDef.CALL_TIMEOUT
        );
      }
      break;
      case typesDef.GET_MESSAGES:{
        const documentID =
        sender < receiver ? sender + receiver : receiver + sender;
        const pageNo= JSON.parse(messageString).page
        await connectToDB();
        console.log("page is",pageNo)
        await Convo.aggregate([
          { $match: { users: documentID } }, // Match the document by its ID
          { $project: { first10Messages: { $slice: ["$messages",-10*Number(pageNo), 10,]} } }
        ]).then(async(result) => {
          if (result.length > 0) {
            // console.log(result[0].first10Messages)
            const messages=JSON.stringify({page:pageNo,messages:result[0].first10Messages})
            const detail = new Blob([
              JSON.stringify({
                type: typesDef.GET_MESSAGES,
                sender: sender,
                receiver: receiver,
              }),
            ]);
            const requestData = new Blob([messages]);
            const combinedData = await new Blob([
              detail,
              requestData,
            ]).arrayBuffer();
            broadcastMessage(
              sender,
              sender,
              combinedData,
              connectionId,
              typesDef.GET_MESSAGES
            );
          } else {
            console.log("Document not found");
            const messages=JSON.stringify({page:pageNo,messages:[]})
            const detail = new Blob([
              JSON.stringify({
                type: typesDef.GET_MESSAGES,
                sender: sender,
                receiver: receiver,
              }),
            ]); 
            const requestData = new Blob([messages]);
            const combinedData = await new Blob([
              detail,
              requestData,
            ]).arrayBuffer();
            broadcastMessage(
              sender,
              sender,
              combinedData,
              connectionId,
              typesDef.GET_MESSAGES
            );
          }
        }).catch(err => {
          console.error(err);
        });
        // console.log("messages are",messages)
      }
      break;
    default:
      broadcastMessage(sender, receiver, message, connectionId, "default");
  }
}

function handleDisconnect(userId) {
  // console.log(`${userId} disconnected.`);
  // const json = { type: typesDef.USER_EVENT };
  const username = users[userId]?.username || userId;
  userActivity.push(`${username} left the document`);
  // json.data = { users, userActivity };
  const leftUser = delete clients[userId];
  delete users[userId];
  // broadcastMessage(json);
}

// A new client connection request received
wsServer.on("connection", function (connection, req) {
  // Generate a unique code for every user
  const connectionID = randomUUID();
  console.log("Received a new connection");

  // Store the new connection and handle messages
  // clients[userId] = connection;
  // console.log(`${userId} connected.`);
  connection.on("message", (message) =>
    handleMessage(message, connectionID, connection)
  );
  // User disconnected
  connection.on("close", (data) => {
    handleDisconnect(connectionID);
  });
});
