
const http=require("http");
const port=3100;
const hostname="localhost"
const express=require("express")
const app=express()
const routes=require("./routes/routes")
const cors=require("cors")
const {WebSocketServer,WebSocket}=require("ws");
const { randomUUID } = require("crypto");

app.use(cors(
))
app.use("/api",routes)
app.use(express.json())
const server=http.createServer(app);

const wsServer=new WebSocketServer({server})

server.listen(port,(req,res)=>{
console.log(`server started at http://}`)
})

const clients = {};
// I'm maintaining all active users in this object
const users = {};
// The current editor content is maintained here.
let editorContent = null;
// User activity history.
let userActivity = [];

// Event types
const typesDef = {
  NEW_USER: 'newUser',
  MESSAGE: 'message'
}

function broadcastMessage(sender,receiver,message,connectionId) {
  console.log("receiver id is",receiver)
  // We are sending the current data to all connected clients
  console.log("receiver is",users[receiver]);
  if(receiver in users ){
    if("connection" in users[receiver])
  users[receiver].connection.send(JSON.stringify({sender,message}))
  }else{

  }
}

function handleMessage(message, connectionId,connection) {
  console.log("message is",message)
  const dataFromClient = JSON.parse(message);
  console.log(dataFromClient);
  
  if (dataFromClient.type === typesDef.NEW_USER) {
    const userID=dataFromClient.userID
    users[userID] = {...dataFromClient,connection,connectionId};
    console.log(users)
    // json.data = { users, userActivity };
  }
  else if (dataFromClient.type === typesDef.MESSAGE) {
    const sender=dataFromClient.sender;
    const receiver=dataFromClient.receiver;
    const message=dataFromClient.message
    broadcastMessage(sender,receiver,message,connectionId);
  }
}

function handleDisconnect(userId) {
    console.log(`${userId} disconnected.`);
    // const json = { type: typesDef.USER_EVENT };
    const username = users[userId]?.username || userId;
    userActivity.push(`${username} left the document`);
    // json.data = { users, userActivity };
    const leftUser=
    delete clients[userId];
    delete users[userId];
    // broadcastMessage(json);
}

// A new client connection request received
wsServer.on('connection', function(connection,req) {
  // Generate a unique code for every user
  const connectionID = randomUUID();
  console.log('Received a new connection');

  // Store the new connection and handle messages
  // clients[userId] = connection;
  // console.log(`${userId} connected.`);
  connection.on('message', (message) => handleMessage(message, connectionID,connection));
  // User disconnected
  connection.on('close', (data) => {
    handleDisconnect(connectionID)});
});