import { useEffect, useState } from "react";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import colors from "../../style/colors";
import { Link } from "react-router-dom";

export default function ListProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.getProduct,
      });
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white animate-pulse">
          Đang tải sản phẩm...
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800"
            >
              <div className="relative pt-[100%] bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="p-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
                <div className="flex items-center justify-between mt-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3" />
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1
        className={`text-2xl font-bold mb-6 flex text-gray-800 ${colors.textColors.gradientPinkToYellow}`}
      >
        Sản phẩm của chúng tôi
      </h1>

      {products.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300">
          Không tìm thấy sản phẩm nào.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800"
              key={product._id}
            >
              <div className="relative pt-[100%] bg-gray-100 dark:bg-gray-900">
                <img
                  src={product?.product_pic[0]}
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-contain p-4"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>
              <div className="p-4">
                <h2 className="font-medium text-gray-800 dark:text-white text-lg mb-2 line-clamp-2 h-14">
                  {product.name}
                </h2>
                <div className="flex items-center justify-between mt-2">
                  <strong className="text-red-600 dark:text-red-400 text-lg">
                    {formatPrice(product.price)}
                  </strong>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Thêm giỏ hàng
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
