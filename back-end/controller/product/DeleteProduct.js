import { productModel } from "../../models/Product.js";

export default async function DeleteProduct(request, response) {
    try {
        const { id } = request.body;

        if (!id) {
            return response.status(400).json({
                message: "Thiếu ID sản phẩm",
                success: false,
            });
        }

        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return response.status(404).json({
                message: "Không tìm thấy sản phẩm",
                success: false,
            });
        }

        return response.status(200).json({
            message: "Xóa sản phẩm thành công",
            success: true,
            product: deletedProduct,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || "Lỗi server",
            success: false,
            error: true,
        });
    }
}
