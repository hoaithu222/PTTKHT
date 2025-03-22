import { LuImagePlus } from "react-icons/lu";

import { useState } from "react";
import { X } from "lucide-react";
import uploadImage from "../utils/uploadImage";

export default function UploadImageProduct({ data, setData }) {
  const [loading, setLoading] = useState(false);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const urlImage = await uploadImage(file);
    setLoading(false);
    console.log(urlImage);

    if (urlImage) {
      setData((prev) => ({
        ...prev,
        product_pic: [...(prev.product_pic || []), urlImage.data.data], // Chỉ lấy URL
      }));
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setData((prev) => ({
      ...prev,
      product_pic: prev.product_pic.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 flex-wrap">
        {data?.product_pic?.map((img, index) => (
          <div
            className="w-28 h-28 border relative group"
            key={`${img}-${index}`}
          >
            <img
              src={img} // Chỉ là URL
              alt={`Product ${index}`}
              className="w-full h-full object-cover group-hover:border-blue-400"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        <label
          className="w-28 h-28 border-dashed border-2 border-red-200 flex flex-col items-center justify-center text-red-400 cursor-pointer"
          htmlFor="image-upload"
        >
          {loading ? <p>Đang tải...</p> : <LuImagePlus className="text-3xl" />}
          <p className="text-lg">Thêm ảnh</p>
        </label>
        <input
          type="file"
          id="image-upload"
          hidden
          onChange={handleUploadImage}
        />
      </div>
    </div>
  );
}
