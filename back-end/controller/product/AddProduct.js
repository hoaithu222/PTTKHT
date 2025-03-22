import { productModel } from "../../models/Product.js";

export default async function AddProduct(request, response) {
    try {
        const { name, price, description, quantity, product_pic } = request.body;
        const product = new productModel({
            name,
            price,
            description,
            quantity,
            product_pic,
        })
        const newProduct = await product.save();
        if (newProduct) {
            return response.status(201).json({
                message: "Thêm sản phẩm thành công",
                success: true,
                product: newProduct,
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }

}