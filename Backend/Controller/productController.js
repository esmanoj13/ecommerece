const Product = require("../Models/productModel");
const Errorhandler = require("../utils/errorhandler");
const asyncerror = require("../middleware/catchasyncerror");
const Apisearch = require("../utils/API search");
// It is used to create product
// This is used to handle the async error "asyncerror("
exports.createProduct = asyncerror(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
})
// To get the product details of the product
exports.getproductDeatail = asyncerror(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        // This is used to handle the common errror      
        return next(new Errorhandler(404, "product is not found"));
    }
    res.status(200).json({
        success: true,
        product
    });
})
// It is used to create all thre products
exports.getallProducts = asyncerror(async (req, res) => {
    let productperpage=10;
    const apisearch = new Apisearch(Product.find(), req.query).search().filter().pagination(productperpage);
    const products = await apisearch.query;
    res.status(200).json({
        success: true,
        products
    });
})

// it is used to update the product -for this we use id 
exports.replaceProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);// here params is used to get particulat id of the product
    if (!product) {
        return next(new Errorhandler(404, "product is not found"));
    };
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
}
// It is used to delete the product
exports.deleteProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new Errorhandler(404, "product is not found"));
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product is deleted"
    });
}