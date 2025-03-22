import {
  FaShippingFast,
  FaLeaf,
  FaClock,
  FaPhoneAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { LuVegan } from "react-icons/lu";
import { TbCertificate } from "react-icons/tb";
import { MdLocalOffer } from "react-icons/md";

export default function Section() {
  return (
    <div className="bg-green-50 py-6 px-4 shadow-sm ">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
          <FaShippingFast className="text-green-500 text-3xl mb-2" />
          <h2 className="font-medium text-teal-400">Miễn phí vận chuyển</h2>
          <p className="text-sm text-gray-600">Đơn hàng trên 200k</p>
        </div>

        <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
          <TbCertificate className="text-green-500 text-3xl mb-2" />
          <h2 className="font-medium  text-teal-400">Rau củ VietGAP</h2>
          <p className="text-sm text-gray-600">Đạt chuẩn an toàn</p>
        </div>

        <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
          <FaLeaf className="text-green-500 text-3xl mb-2" />
          <h2 className="font-medium  text-teal-400">100% Tự nhiên</h2>
          <p className="text-sm text-gray-600">Không thuốc trừ sâu</p>
        </div>

        <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
          <FaClock className="text-green-500 text-3xl mb-2" />
          <h2 className="font-medium  text-teal-400">Thu hoạch tươi ngày</h2>
          <p className="text-sm text-gray-600">Giao hàng trong 24h</p>
        </div>

        <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
          <MdLocalOffer className="text-green-500 text-3xl mb-2" />
          <h2 className="font-medium text-teal-400">Khuyến mãi hàng tuần</h2>
          <p className="text-sm text-gray-600">Tiết kiệm tới 15%</p>
        </div>
      </div>
    </div>
  );
}
