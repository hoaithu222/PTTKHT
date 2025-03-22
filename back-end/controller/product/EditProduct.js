import { productModel } from "../../models/Product.js";
export default async function EditProduct(request, response) {
    try {
        const { id, name, price, description, quantity, product_pic } = request.body;

        if (!id) {
            return response.status(400).json({
                message: "Thiếu ID sản phẩm",
                success: false,
            });
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { name, price, description, quantity, product_pic },
            { new: true }
        );

        if (!updatedProduct) {
            return response.status(404).json({
                message: "Không tìm thấy sản phẩm",
                success: false,
            });
        }

        return response.status(200).json({
            message: "Cập nhật sản phẩm thành công",
            success: true,
            product: updatedProduct,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || "Lỗi server",
            success: false,
            error: true,
        });
    }
}
