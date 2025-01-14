const ProductModel = require("../../models/productModel");

const searchProduct = async(req, res) => {
    try {
        const query = req.query.q;

        const regex = new RegExp(query,'i','g');

        const product = await ProductModel.find({
            $or:[
                {
                    productName: regex
                },
                {
                    category: regex
                }
            ]
        });

        res.json({
            data  : product ,
            message : "Search Product list",
            error : false,
            success : true
        });
        
    } catch (error) {
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
};

module.exports = searchProduct;