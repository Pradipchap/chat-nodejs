import "./App.css";
import Toast from "./components/Toast";
import Login from "./sections/Login.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./sections/Signup.tsx";
import AuthenticatedRoute from "./AuthenticatedRoute.tsx";
import VideoComponent from "./components/VideoComponent.tsx";
import { lazy, Suspense, useContext, useEffect } from "react";
import Map from "./sections/Map.tsx";
import Friends from "./sections/Friends.tsx";
import FriendsGroup from "./sections/FriendsGroup.tsx";
import Loading from "./components/Loading.tsx";
import UserProfile from "./sections/UserProfile.tsx";
import { SERVER_BASE_URL } from "../utils/constants.ts";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks.ts";
import Chat from "./components/ChatBox.tsx";
import getSocketData from "../functions/getSocketData.ts";
import { setWsStatus } from "../redux/slices/wsClientSlice.ts";
import { WsContext } from "../utils/WsProvider.tsx";

import {
  pushChat,
  pushMessage,
  updateChats,
} from "../redux/slices/ChatSlice.ts";
import { ChatsDataInterface } from "../interfaces/dataInterfaces.ts";

const AddFriends = lazy(async () => import(".//sections/AddFriends.tsx"));
const FriendRequests = lazy(async () =>
  import("./sections/FriendRequests.tsx")
);

function App() {
  const { wsClient } = useContext(WsContext);
  const currentUser = useAppSelector((state) => state.currentUser);
  const chatter = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    async function handleMessage(connection: MessageEvent<any>) {
      console.log("asf");
      const { message, details } = await getSocketData(connection.data);
      console.log(details.type);
      switch (details.type) {
        case "newUser": {
          console.log("new user");
          dispatch(setWsStatus());
          break;
        }
        case "message":
          {
            console.log(message);
            console.log("dispatching");
            console.log(details.sender, chatter.secondaryChatter);
            if (details.sender === chatter.secondaryChatter)
              console.log("dispatching");
            dispatch(pushMessage([{ message: message, isReceiver: true }]));
          }
          break;
        case "getMess":
          {
            const chat: ChatsDataInterface = JSON.parse(message);
            const finalChats = chat.messages.map((item) => {
              const isReceiver = item.sender !== currentUser.userID;
              return {
                message: item.message,
                isReceiver,
                time: item.datetime,
                id: item._id,
              };
            });
            if (chat.page === 1) dispatch(updateChats(finalChats));
            else dispatch(pushChat(finalChats));
          }
          break;
        default: {
          return;
        }
      }
    }
    if (wsClient instanceof WebSocket)
      wsClient.addEventListener("message", handleMessage);
  }, [wsClient]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthenticatedRoute wsClient={wsClient} />,
      children: [
        {
          path: "chat/:chatterID",
          element: <Chat />,
          // loader: async ({ request, params }) => {
          //   if (wsClient.readyState === 1 && params.chatterID !== ""){
          //     console.log("hello")
          //     sendSocketMessage({
          //       sender: currentUser.userID,
          //       receiver: params.chatterID || "",
          //       type: "getMess",
          //       data: new Blob([JSON.stringify({ page: 1 })]),
          //       wsClient: wsClient,
          //     });
          //   }
          //   return null;
          // },
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/call",
      element: <VideoComponent wsClient={wsClient} />,
    },
    { path: "/register", element: <Signup /> },
    { path: "/map", element: <Map /> },
    {
      path: "/friends",
      element: <Friends />,
      children: [
        {
          path: "friends",
          element: <FriendsGroup />,
        },
        {
          path: "addFriends",
          element: (
            <Suspense fallback={<Loading />}>
              <AddFriends />
            </Suspense>
          ),
        },
        {
          path: "friendRequests",
          element: (
            <Suspense fallback={<Loading />}>
              <FriendRequests />
            </Suspense>
          ),
        },
        {
          path: "userProfile/:userID",
          element: <UserProfile />,
          loader: async ({ request, params }) => {
            return fetch(
              `${SERVER_BASE_URL}/api/user?userID=${params.userID}`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${currentUser.accessToken}`,
                },
                signal: request.signal,
              }
            );
          },
        },
      ],
    },
  ]);
  return (
    <>
      <Toast />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
