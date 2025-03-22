import React from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { MdEmail, MdAccessTime } from "react-icons/md";
import { FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-green-400  ">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Rau Sạch VietGAP</h3>
            <p className="mb-4">
              Chúng tôi cung cấp rau củ quả sạch, đạt chuẩn VietGAP, được trồng
              và thu hoạch bởi các nông dân có kinh nghiệm, đảm bảo an toàn cho
              sức khỏe gia đình bạn.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-green-200">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="hover:text-green-200">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-green-200">
                <FiYoutube size={20} />
              </a>
              <a href="#" className="hover:text-green-200">
                <FaTiktok size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-200">
                  Trang Chủ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-200">
                  Sản Phẩm
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-200">
                  Rau Củ Theo Mùa
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-200">
                  Gói Rau Củ Hàng Tuần
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-200">
                  Chính Sách VietGAP
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-200">
                  Về Chúng Tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-200">
                  Câu Hỏi Thường Gặp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-200">
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Thông Tin Liên Hệ</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2" />
                <p>Chiến thắng,Tân triều,Thanh trì,Hà nội</p>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="mr-2" />
                <p>0912 345 678</p>
              </div>
              <div className="flex items-center">
                <MdEmail className="mr-2" />
                <p>contact@rausachvietgap.vn</p>
              </div>
              <div className="flex items-start">
                <MdAccessTime className="mt-1 mr-2" />
                <div>
                  <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                  <p>Thứ 7 - Chủ Nhật: 8:00 - 12:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-green-500">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-medium">Đăng Ký Nhận Thông Tin</h4>
              <p>Nhận thông tin khuyến mãi và bí quyết ăn uống lành mạnh</p>
            </div>
            <div className="w-full md:w-1/3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="p-2 text-gray-800 w-full rounded-l focus:outline-none"
                />
                <button className="bg-green-800 hover:bg-green-900 px-4 py-2 rounded-r">
                  Đăng Ký
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-green-500 text-center">
          <p>
            © {new Date().getFullYear()} Rau Sạch VietGAP. Tất cả quyền được bảo
            lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
