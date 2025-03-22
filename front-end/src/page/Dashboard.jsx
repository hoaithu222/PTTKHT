import { IoAddCircleSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import colors from "../style/colors";
import { useEffect, useState } from "react";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";
import ConfirmBox from "../components/ConfirmBox";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [productDelete, setProductDelete] = useState("");

  const getProduct = async () => {
    const response = await Axios({
      ...SummaryApi.getProduct,
    });
    if (response.data.success) {
      setProducts(response.data.products);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenEditProduct(true);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: {
          id: productId,
        },
      });

      if (response.data.success) {
        getProduct();
        toast.success("Xóa sản phẩm thành công!");
        setOpenConfirmDelete(false);
      } else {
        toast.error(response.data.message || "Xóa sản phẩm thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      toast.error("Đã xảy ra lỗi khi xóa sản phẩm!");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mt-20 p-4 container mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center border-b-2 dark:border-primary-light/30 border-primary/30 pb-4 mb-6">
        <h2 className="text-3xl font-bold bg-gradient-green-blue dark:bg-gradient-orange-yellow bg-clip-text text-transparent">
          Danh sách sản phẩm
        </h2>
        <button
          className="mt-4 sm:mt-0 sm:ml-auto px-4 py-2.5 bg-gradient-green dark:bg-gradient-orange-yellow text-white rounded-xl hover:opacity-90 transition-all duration-200 shadow-md flex items-center"
          onClick={() => setOpenAddProduct(true)}
        >
          <IoAddCircleSharp className="mr-2 text-xl" />
          Thêm sản phẩm
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl shadow-card">
        <table className="min-w-full bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-primary-light/10 to-secondary-light/10 dark:from-primary-dark/20 dark:to-secondary-dark/20">
              <th className="py-3.5 px-4 border-b dark:border-gray-700 text-left font-semibold text-text-light dark:text-text-dark">
                STT
              </th>
              <th className="py-3.5 px-4 border-b dark:border-gray-700 text-left font-semibold text-text-light dark:text-text-dark">
                Hình ảnh
              </th>
              <th className="py-3.5 px-4 border-b dark:border-gray-700 text-left font-semibold text-text-light dark:text-text-dark">
                Tên sản phẩm
              </th>
              <th className="py-3.5 px-4 border-b dark:border-gray-700 text-left font-semibold text-text-light dark:text-text-dark">
                Giá
              </th>
              <th className="py-3.5 px-4 border-b dark:border-gray-700 text-left font-semibold text-text-light dark:text-text-dark">
                Số lượng
              </th>
              <th className="py-3.5 px-4 border-b dark:border-gray-700 text-left font-semibold text-text-light dark:text-text-dark">
                Ngày cập nhật
              </th>
              <th className="py-3.5 px-4 border-b dark:border-gray-700 text-center font-semibold text-text-light dark:text-text-dark">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className="hover:bg-primary-light/5 dark:hover:bg-primary-dark/10 transition-colors duration-150"
              >
                <td className="py-3.5 px-4 border-b dark:border-gray-700 text-text-light dark:text-text-dark">
                  {index + 1}
                </td>
                <td className="py-3.5 px-4 border-b dark:border-gray-700">
                  {product.product_pic && product.product_pic.length > 0 ? (
                    <div className="flex -space-x-3">
                      {product.product_pic.slice(0, 2).map((pic, picIndex) => (
                        <img
                          key={picIndex}
                          src={pic}
                          alt={`${product.name}-${picIndex}`}
                          className="w-14 h-14 object-cover rounded-lg border-2 border-white dark:border-gray-800 shadow-sm"
                        />
                      ))}
                      {product.product_pic.length > 2 && (
                        <div className="w-14 h-14 flex items-center justify-center bg-primary-light/10 dark:bg-primary-dark/20 rounded-lg border-2 border-white dark:border-gray-800 text-xs font-medium text-primary dark:text-primary-light">
                          +{product.product_pic.length - 2}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500">
                      No image
                    </div>
                  )}
                </td>
                <td className="py-3.5 px-4 border-b dark:border-gray-700 font-medium text-text-light dark:text-text-dark">
                  {product.name}
                </td>
                <td className="py-3.5 px-4 border-b dark:border-gray-700 text-primary dark:text-primary-light font-medium">
                  {formatPrice(product.price)}
                </td>
                <td className="py-3.5 px-4 border-b dark:border-gray-700 text-text-light dark:text-text-dark">
                  <span className="px-2.5 py-1 bg-primary-light/10 dark:bg-primary-dark/20 rounded-full text-sm font-medium">
                    {product.quantity}
                  </span>
                </td>
                <td className="py-3.5 px-4 border-b dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm">
                  {formatDate(product.updatedAt)}
                </td>
                <td className="py-3.5 px-4 border-b dark:border-gray-700">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
                      title="Sửa sản phẩm"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        setOpenConfirmDelete(true);
                        setProductDelete(product._id);
                      }}
                      className="p-2 bg-accent-red text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                      title="Xóa sản phẩm"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="py-12 text-center text-gray-500 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-xl font-medium text-text-light dark:text-text-dark mb-2">
                      Không có sản phẩm nào
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Hãy thêm sản phẩm mới bằng nút "Thêm sản phẩm"
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openAddProduct && (
        <AddProduct
          onClose={() => setOpenAddProduct(false)}
          onLoad={getProduct}
        />
      )}

      {openEditProduct && editingProduct && (
        <EditProduct
          product={editingProduct}
          onClose={() => {
            setOpenEditProduct(false);
            setEditingProduct(null);
          }}
          onLoad={getProduct}
        />
      )}
      {openConfirmDelete && (
        <ConfirmBox
          cancel={() => setOpenConfirmDelete(false)}
          confirm={() => handleDelete(productDelete)}
          close={() => setOpenConfirmDelete(false)}
        />
      )}
    </div>
  );
}
