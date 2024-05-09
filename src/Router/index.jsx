import React, { useEffect } from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/layout";
import ClientLayout from "../layout/ClientLayout";

import Login from "../components/Login";
import Register from "../components/Register";
import Calenderpage from "../components/calendrierPage";
import Home from "../components/home";


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: < Register/>,
      },

      // {
      //   path: "*",
      //   element: <NotFound />,
      // },
    ],
  },
  {
    element: <ClientLayout />,
    children: [
      {
        path: "/calendar",
        element: <Calenderpage />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/edit/:eventdata",
        element: <Home />,
      },
    ],
  },

]);
