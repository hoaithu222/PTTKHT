import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListConversation from "./components/ListConversation";
import { useEffect, useState } from "react";
import fetchUser from "./utils/fetchUser";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUser } from "./redux/userSlice";
import { useSocket } from "./context/SocketProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const socket = useSocket();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // useEffect(() => {
  //   if (localStorage.getItem("accessToken")) {
  //     fetchUser();
  //   } else {
  //     localStorage.removeItem("accessToken");
  //     localStorage.removeItem("refreshToken");
  //     navigate("/login");
  //   }
  // }, [navigate]);

  useEffect(() => {
    if (!socket) return;

    socket.on("online user", (data) => {
      dispatch(setOnlineUser(data));
    });

    return () => {
      socket.off("online user");
    };
  }, [socket]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark w-full min-h-screen overflow-y-auto">
      <Header />
      {/* <div className="flex  gap-2 md:gap-3 lg:gap-4 relative h-full">
        <Navbar />
        {isMobile ? (
          <Outlet />
        ) : (
          <>
            <ListConversation />
            <Outlet />
          </>
        )}
      </div> */}
      <Outlet />
      <Footer />
    </div>
  );
}
