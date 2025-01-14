const uploadProductPermission = require("../../helpers/permission");
const ProductModel = require("../../models/productModel");

const uploadProductController = async(req, res) => {
    try {
        const sessionUserId = req.userId;

        if(!uploadProductPermission(sessionUserId)){
            throw new Error('Permission denie')
        }
        
        const uploadProduct = new ProductModel(req.body);
        const saveProduct = await uploadProduct.save();

        res.status(201).json({
            message : "Product upload successfully",
            error : false,
            success : true,
            data : saveProduct
        });

    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message || err,
            error: true
        });
    }
};

module.exports = uploadProductController;