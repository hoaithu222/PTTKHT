import { FaCartPlus, FaFacebookMessenger } from "react-icons/fa";
import colors from "../style/colors";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import ListConversation from "../components/ListConversation";
import image01 from "/src/assets/Logo/logo.png";
import { BsSearchHeart } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { ThemeContext } from "../context/ThemeContext";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import UserMenu from "./UserMenu";

export default function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(theme === "dark");
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setDarkMode(theme === "dark");
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-20 shadow-lg bg-green-400 shadow-gray-500 flex justify-between items-center px-5 md:px-8 lg:px-10">
      <Link
        to="/"
        className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 overflow-hidden"
      >
        <img
          src={image01}
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </Link>

      <div className="flex items-center gap-1 md:gap-2 lg:gap-3 bg-white border-pink-200 border-2 rounded-full px-3 py-2 w-3/5 md:w-2/5 lg:w-1/3">
        <BsSearchHeart className="text-xl md:text-2xl text-green-600" />
        <input
          type="text"
          placeholder="Vui lòng nhập từ khóa cần tìm kiếm..."
          name="search"
          className="text-gray-600 w-full focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
        <div className="relative">
          <div
            className="w-8 h-8 cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaCartPlus className="w-full h-full text-white" />
          </div>

          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            0
          </span>
        </div>

        {/* <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 cursor-pointer">
          {theme === "dark" ? (
            <CiLight
              className="w-full h-full text-gray-100"
              onClick={handleToggleDarkMode}
            />
          ) : (
            <MdDarkMode
              className="w-full h-full text-gray-800"
              onClick={handleToggleDarkMode}
            />
          )}
        </div> */}

        <div
          ref={menuRef}
          className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 overflow-hidden rounded-full p-0.5 ${colors.gradients.blueToPink}  cursor-pointer`}
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          {user.avatar ? (
            <img
              src={user?.avatar}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <FaRegCircleUser className="w-full h-full object-contain rounded-full text-white" />
          )}

          {isOpenMenu && <UserMenu onClose={() => setIsOpenMenu(false)} />}
        </div>
      </div>
    </div>
  );
}
