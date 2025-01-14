const ProductModel = require("../../models/productModel");

const getProductController = async(req, res) => {
    try {
        const allProduct = await ProductModel.find().sort({createdAt: -1});

        res.json({
            message: 'All Products',
            success: true,
            error: false,
            data: allProduct
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message || err,
            error: true
        });
    }
};

module.exports = getProductController;