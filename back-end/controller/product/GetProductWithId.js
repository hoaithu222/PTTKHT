import { productModel } from "../../models/Product.js";

export default async function GetProductWithId(request, response) {
    try {
        const { id } = request.body;
        const product = await productModel.findById(id);

        return response.status(200).json({
            message: "Lấy sản phẩm thành công",
            error: false,
            success: true,
            product: product,
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || "Lỗi server",
            success: false,
            error: true,
        });
    }
}