import { FaEdit } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { CiLogout } from "react-icons/ci";
import { ThemeContext } from "../context/ThemeContext";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import colors from "../style/colors";
import { CiLogin } from "react-icons/ci";
import { MdAddBusiness } from "react-icons/md";

export default function UserMenu({ onClose }) {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  console.log(user);
  const refreshToken = localStorage.getItem("refreshToken");
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.logout,
        data: {
          refreshToken: refreshToken,
        },
      });
      toast.success("Đăng xuất thành công");
      navigate("/login");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(logout());
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng xuất thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`absolute top-20 right-10 z-50 shadow-lg rounded-md w-[125px] sm:w-[130px] md:w-[140px] lg:w-[165px] p-1 ${colors.gradients.frostToFlame} bg-opacity-95`}
    >
      <div className="flex justify-end px-1" onClick={onClose}>
        <IoMdClose className="text-xl md:text-2xl text-white hover:text-red-200 cursor-pointer" />
      </div>

      {user?._id ? (
        <div className="flex flex-col w-full text-white cursor-pointer">
          <div
            className="flex items-center gap-2 p-2 lg:p-3 hover:bg-pink-100 hover:text-sky-500 rounded-lg transition-colors duration-200"
            onClick={() => {
              onClose();
              navigate("/profile");
            }}
          >
            <FaEdit className="text-lg md:text-xl flex-shrink-0" />
            <span className="text-sm md:text-base whitespace-nowrap">
              Profile
            </span>
          </div>

          {user.role === "admin" && (
            <div
              className="flex items-center gap-2 p-2 lg:p-3 hover:bg-pink-100 hover:text-sky-500 rounded-lg transition-colors duration-200"
              onClick={() => {
                onClose();
                navigate("/dashboard");
              }}
            >
              <MdAddBusiness className="text-lg md:text-xl flex-shrink-0" />
              <span className="text-sm md:text-base whitespace-nowrap">
                Quản lý
              </span>
            </div>
          )}

          <div
            className="flex items-center gap-2 p-2 lg:p-3 hover:bg-pink-100 hover:text-sky-500 rounded-lg transition-colors duration-200"
            onClick={() => {
              handleLogout();
              onClose();
            }}
          >
            <CiLogout className="text-lg md:text-xl flex-shrink-0" />
            <span className="text-sm md:text-base whitespace-nowrap">
              Đăng xuất
            </span>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center gap-2 p-2 lg:p-3 hover:bg-pink-100 hover:text-sky-500 rounded-lg transition-colors duration-200"
          onClick={() => {
            navigate("/login");
          }}
        >
          <CiLogin className="text-lg md:text-xl flex-shrink-0" />
          <span className="text-sm md:text-base whitespace-nowrap">Login</span>
        </div>
      )}
    </div>
  );
}
