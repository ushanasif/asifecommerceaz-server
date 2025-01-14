const ProductModel = require("../models/productModel")

const uploadProductPermission = async(userId) => {
    const user = await ProductModel.findById(userId);

    if(user?.role !== 'ADMIN'){
        return false;
    }

    return true;
};

module.exports = uploadProductPermission;