import "./App.css";
import ReduxProvider from "../redux/ReduxProvider";
import Toast from "./components/Toast";
import Login from "./sections/Login.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./sections/Signup.tsx";
import AuthenticatedRoute from "./AuthenticatedRoute.tsx";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthenticatedRoute />,
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
