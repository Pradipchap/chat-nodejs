import "./App.css";
import Toast from "./components/Toast";
import Login from "./sections/Login.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./sections/Signup.tsx";
import AuthenticatedRoute from "./AuthenticatedRoute.tsx";
import VideoComponent from "./components/VideoComponent.tsx";
import { lazy, Suspense, useMemo } from "react";
import Map from "./sections/Map.tsx";
import Friends from "./sections/Friends.tsx";
import FriendsGroup from "./sections/FriendsGroup.tsx";
import Loading from "./components/Loading.tsx";
import UserProfile from "./sections/UserProfile.tsx";
import { SERVER_BASE_URL } from "../utils/constants.ts";
import { useAppSelector } from "../utils/reduxHooks.ts";
import Chat from "./components/ChatBox.tsx";

const AddFriends = lazy(async () => import(".//sections/AddFriends.tsx"));
const FriendRequests = lazy(async () =>
  import("./sections/FriendRequests.tsx")
);
function App() {
  const wsClient = useMemo(() => new WebSocket(`ws://localhost:3100`), []);
  const accessToken = useAppSelector((state) => state.currentUser.accessToken);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthenticatedRoute wsClient={wsClient} />,
      children: [
        {
          path: "chat/:chatterID",
          element: <Chat wsClient={wsClient} />,
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
                  Authorization: `Bearer ${accessToken}`,
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
