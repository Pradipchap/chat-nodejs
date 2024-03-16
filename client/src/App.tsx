import "./App.css";
import ReduxProvider from "../redux/ReduxProvider";
import Toast from "./components/Toast";
import Login from "./sections/Login.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Front from "./sections/Front.tsx";
import Signup from "./sections/Signup.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Front />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    { path: "/register", element: <Signup /> },
  ]);
  return (
    <ReduxProvider>
      <Toast />
      <RouterProvider router={router} />
    </ReduxProvider>
  );
}

export default App;
