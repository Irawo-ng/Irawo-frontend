import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import Authpage from "./components/Authpage";
import MainPage from "./components/mainpage";
import SignUp from "./components/signup";
import LogIn from "./components/login";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./components/userContext";

// import PrivateRoute from "./components/privateroute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "authpage",
    element: <Authpage />,
    children: [
      {
        index: true,
        element: <SignUp />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
    ],
  },
  {
    path: "mainpage",
    element: <MainPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </UserProvider>
  </React.StrictMode>
);
