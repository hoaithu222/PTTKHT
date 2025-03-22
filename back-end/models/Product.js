import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tên bắt buộc phải nhập"],
    },
    price: {
        type: Number,
        required: [true, "Giá bắt buộc phải nhập"],
    },
    description: {
        type: String,
        required: [true, "Mô tả bắt buộc phải nhập"],
    },
    quantity: {
        type: Number,
        required: [true, "Số lượng bắt buộc phải nhập"],
    },
    product_pic: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
})
export const productModel = mongoose.model("Product", productSchema);