import {
  FcApproval,
  FcBiohazard,
  FcInvite,
  FcLikePlaceholder,
} from "react-icons/fc";
import InputFile from "../components/InputFile";
import InputPassword from "../components/InputPassword";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import uploadImage from "../utils/uploadImage";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import colors from "../style/colors";
import { PiArrowCircleDownBold } from "react-icons/pi";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Bạn vui lòng chọn ảnh");
      return;
    }

    setLoadingUpload(true);
    try {
      const response = await uploadImage(file);

      if (response?.data?.data) {
        setData((prev) => ({
          ...prev,
          profile_pic: response.data.data,
        }));
        toast.success("Tải ảnh lên thành công");
      } else {
        throw new Error("Không nhận được URL ảnh từ server");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.message || "Đã xảy ra lỗi khi tải ảnh lên");
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data,
      });

      toast.success("Đã tạo tài khoản thành công");
      navigate("/login");
      setData({
        name: "",
        email: "",
        password: "",
        profile_pic: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto container min-h-screen  flex items-center justify-center p-6 sm:p-2">
      <div className="shadow-2xl shadow-slate-300 p-8 max-w-md w-full rounded-xl bg-white">
        <div className="p-1">
          <h2
            className={`${colors.textColors.gradientLimeToPink}  font-semibold text-xl  md:text-xl`}
          >
            Chào mừng bạn đến với dự án nhóm 9!
          </h2>
          <PiArrowCircleDownBold className="text-4xl mx-auto mt-2 text-green-500" />
          <p
            className={`text-transparent text-xs md:text-base text-center ${colors.textColors.gradientCyanToLime}  sm:text-lg lg:text-lg`}
          >
            Hãy tạo tài khoản để tiếp tục
          </p>
        </div>
        <div className="mt-1">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4  rounded-lg  hover:shadow-red-100"
            autoComplete="off"
          >
            <div className="space-y-2 md:space-y-3 lg:space-y-4 flex items-center justify-center mb-2 sm:mb-3 lg:mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 relative rounded-full overflow-hidden">
                {data.profile_pic ? (
                  <img
                    src={data.profile_pic}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-full h-full object-cover text-pink-200" />
                )}
                <label
                  htmlFor="image"
                  className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-1 text-white bg-gradient-to-br from-sky-400 to-purple-400 p-1 cursor-pointer"
                >
                  {loadingUpload ? (
                    <span>Đang tải...</span>
                  ) : (
                    <>
                      <span>{data.profile_pic ? "Thay đổi" : "Thêm ảnh"}</span>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="image"
                  name="profile_pic"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={loadingUpload}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                />
              </div>
            </div>
            <InputFile
              name="name"
              placeholder="Vui lòng nhập tên"
              label="Tên"
              onChange={handleChange}
              id="name"
              icon={
                <FcApproval className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl" />
              }
              required={true}
            />
            <InputFile
              type="email"
              name="email"
              placeholder="Vui lòng nhập email"
              label="Email"
              onChange={handleChange}
              id="email"
              icon={
                <FcInvite className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl" />
              }
              required={true}
            />
            <InputPassword
              name="password"
              placeholder="Vui lòng nhập mật khẩu"
              label="Mật khẩu"
              onChange={handleChange}
              id="password"
              icon={
                <FcBiohazard className="ml-1 text-1xl sm:text-2xl md:text-3xl lg:text-4xl" />
              }
              required={true}
            />
            <button
              type="submit"
              className={`py-3 w-full  rounded-md mt-4 sm:mt-5 md:mt-6 lg:mt-7 text-white ${colors.gradients.pinkToPurple}  mx-auto flex items-center justify-center`}
              disabled={loadingUpload}
            >
              {loading ? "Loading...." : "Đăng kí"}
            </button>
          </form>
        </div>
        <div className="mt-3">
          <p className="text-gray-500  p-2 md:p-3 text-center ">
            Nếu bạn đã có tài khoản!
            <Link to="/login" className="text-green-500 font-semibold text-md">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
