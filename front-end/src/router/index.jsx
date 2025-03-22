import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Home from "../page/Home";
import Profile from "../page/Profile";
import MessagePage from "../components/MessagePage";
import Login from "../page/Login";
import Register from "../page/Register";
import PrivateRouter from "../Layout/PrivateRouter";
import LayoutForm from "../Layout/LayoutForm";
import Setting from "../page/Setting";
import SearchUser from "../page/SearchUser";

import Dashboard from "../page/Dashboard";
import DetailProduct from "../page/DetailProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <DetailProduct />,
      },
      // {
      //   path: "/:id",
      //   element: <MessagePage />,
      // },
      { path: "profile", element: <Profile /> },
      { path: "dashboard", element: <Dashboard /> },
      // { path: "search-user", element: <SearchUser /> },
    ],
  },
  {
    path: "/",
    element: <LayoutForm />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default router;
