import "./App.css";
import ReduxProvider from "../redux/ReduxProvider";
import Toast from "./components/Toast";
import Login from "./sections/Login.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./sections/Signup.tsx";
import AuthenticatedRoute from "./AuthenticatedRoute.tsx";
import VideoComponent from "./components/VideoComponent.tsx";
import { useMemo } from "react";
import Map from "./sections/Map.tsx";
import Friends from "./sections/Friends.tsx";
import UserCard from "./components/UserCard.tsx";
import FriendsGroup from "./sections/FriendsGroup.tsx";
import AddFriends from "./sections/AddFriends.tsx";

function App() {
  const wsClient = useMemo(() => new WebSocket(`ws://localhost:3100`), []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthenticatedRoute wsClient={wsClient} />,
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
          path: "allfriends",
          element: <FriendsGroup />,
        },
        {
          path: "addFriends",
          element: <AddFriends />,
        },
      ],
    },
  ]);
  return (
    <ReduxProvider>
      <Toast />
      <RouterProvider router={router} />
    </ReduxProvider>
  );
}

export default App;
