import { productModel } from "../../models/Product.js";

export default async function GetProducts(request, response) {
    try {
        const { search, minPrice, maxPrice, page = 1, limit = 8 } = request.query;
        let filter = { isDeleted: { $ne: true } };

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        if (minPrice) {
            filter.price = { ...filter.price, $gte: Number(minPrice) };
        }

        if (maxPrice) {
            filter.price = { ...filter.price, $lte: Number(maxPrice) };
        }

        const products = await productModel
            .find(filter)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await productModel.countDocuments(filter);

        return response.status(200).json({
            message: "Lấy danh sách sản phẩm thành công",
            success: true,
            products,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
            },
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || "Lỗi server",
            success: false,
            error: true,
        });
    }
}
