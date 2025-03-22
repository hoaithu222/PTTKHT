import { useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useEffect, useState } from "react";

export default function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.getProductWithId,
        data: {
          id: id,
        },
      });
      if (response.data.success) {
        setProduct(response.data.product);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Implement add to cart functionality here
    alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="bg-gray-200 dark:bg-gray-700 animate-pulse h-96 rounded-lg"></div>
              <div className="flex gap-2 mt-4">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 dark:bg-gray-700 animate-pulse h-24 w-24 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/4 mb-4"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-4"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/2 mb-4"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product || !product._id) {
    return (
      <div className="container mx-auto px-4 py-16 mt-20 text-center">
        <h2 className="text-2xl font-medium text-gray-800 dark:text-white">
          Không tìm thấy thông tin sản phẩm
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Sản phẩm không tồn tại hoặc đã bị xóa.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="w-full md:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 p-4">
              <div className="relative pt-[100%]">
                <img
                  src={
                    product.product_pic?.[selectedImage] ||
                    "https://via.placeholder.com/500"
                  }
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.product_pic && product.product_pic.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {product.product_pic.map((pic, index) => (
                  <div
                    key={index}
                    className={`h-24 w-24 border-2 rounded-lg cursor-pointer overflow-hidden flex-shrink-0
                    ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={pic}
                      alt={`${product.name} - ảnh ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatPrice(product.price)}
              </span>
              <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-sm">
                Còn {product.quantity} sản phẩm
              </span>
            </div>

            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-4">
              <p className="text-gray-700 dark:text-gray-300">
                {product.description || "Không có mô tả cho sản phẩm này."}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-6 mb-6">
                <span className="text-gray-700 dark:text-gray-300">
                  Số lượng:
                </span>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                  <button
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                    className={`px-3 py-1 ${
                      quantity <= 1
                        ? "text-gray-400 dark:text-gray-600"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border-l border-r border-gray-300 dark:border-gray-600 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncreaseQuantity}
                    disabled={quantity >= product.quantity}
                    className={`px-3 py-1 ${
                      quantity >= product.quantity
                        ? "text-gray-400 dark:text-gray-600"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
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
                Thêm vào giỏ hàng
              </button>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Mã sản phẩm: {product._id}</p>
              <p>Cập nhật lần cuối: {formatDate(product.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
