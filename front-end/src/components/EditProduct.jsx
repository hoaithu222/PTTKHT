import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlinePriceChange } from "react-icons/md";
import { toast } from "react-toastify";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import colors from "../style/colors";
import InputFile from "./InputFile";
import { FcApproval } from "react-icons/fc";
import { FaArrowsToCircle } from "react-icons/fa6";
import TextareaInput from "./TextareaInput";
import UploadImageProduct from "./UploadImageProduct";

export default function EditProduct({ product, onClose, onLoad }) {
  const [data, setData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    product_pic: [],
  });
  console.log(product);
  useEffect(() => {
    if (product) {
      setData({
        id: product._id,
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        quantity: product.quantity || "",
        product_pic: product.product_pic || [],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.editProduct,

        data,
      });

      if (response.data.success) {
        onClose();
        onLoad();
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        toast.error(response.data.message || "Cập nhật sản phẩm thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật sản phẩm!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] custom-scrollbar hidden-scrollbar overflow-y-auto transform transition-all duration-300">
        <div className="bg-gradient-to-r from-purple-400 to-blue-500 rounded-t-xl p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl text-white">Chỉnh Sửa Sản Phẩm</h2>
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-all duration-200"
            >
              <IoClose className="text-white text-xl" />
            </button>
          </div>
        </div>

        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <InputFile
              name="name"
              placeholder="Vui lòng nhập tên sản phẩm"
              label="Tên sản phẩm"
              onChange={handleChange}
              value={data.name}
              id="name"
              icon={<FcApproval className="text-2xl" />}
              required={true}
            />

            <InputFile
              type="number"
              name="price"
              placeholder="Vui lòng nhập giá"
              label="Giá sản phẩm"
              onChange={handleChange}
              value={data.price}
              id="price"
              icon={
                <MdOutlinePriceChange className="text-2xl text-green-500" />
              }
              required={true}
            />
          </div>

          <InputFile
            type="number"
            name="quantity"
            placeholder="Vui lòng nhập số lượng"
            label="Số lượng"
            onChange={handleChange}
            value={data.quantity}
            id="quantity"
            icon={<FaArrowsToCircle className="text-2xl text-blue-500" />}
            required={true}
          />

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <FaCloudUploadAlt className="text-blue-500 mr-2 text-xl" />
              Hình ảnh sản phẩm
            </p>
            <UploadImageProduct data={data} setData={setData} />
          </div>

          <TextareaInput
            label="Mô tả sản phẩm"
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Nhập mô tả chi tiết về sản phẩm..."
            required
          />

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2 px-6 rounded-lg hover:opacity-90 transition-all duration-200 font-medium shadow-md"
            >
              Cập Nhật Sản Phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
