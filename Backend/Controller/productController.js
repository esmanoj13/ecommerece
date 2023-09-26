const Product = require("../Models/productModel");
const Errorhandler = require("../utils/errorhandler");
const asyncerror = require("../middleware/catchasyncerror");
const Apisearch = require("../utils/API search");
// It is used to create product
// This is used to handle the async error "asyncerror("
exports.createProduct = asyncerror(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
})
// It is used to get all products
exports.getallProducts = asyncerror(async (req, res,next) => {   
    let productperpage = 5;
    const productCount=await Product.countDocuments();
    const apisearch = new Apisearch(Product.find(), req.query).search().filter().pagination(productperpage);
    const products = await apisearch.query;
    res.status(200).json({
        success: true,
        products,
        productCount        
    });
});
// To get the product details of the product
exports.getproductDeatail = asyncerror(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        // This is used to handle the common errror      
        return next(new Errorhandler(404, "product is not found"));
    }
    res.status(200).json({
        success: true,
        product,
       
    });
})


// It is used to update the product -for this we use id 
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
// It is used to create the product rating
exports.cretaeProductRating = async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };   
    const product = await Product.findById(productId);
    const isreviewed = product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString()); 
    if (isreviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating),
                    (rev.comment = comment)
        });
    }
    else {
        product.reviews.push(review);
        noofReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach(rev => {
        avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;
    noofReviews = product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
}
// It is used to get all reviews.
exports.getallreviews = asyncerror(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new Errorhandler(404, "This product isn't have any review."));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});
// It is used to delete  reviews.
exports.deleteReview = asyncerror(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());
    console.log(reviews);
    if (!reviews) {
        res.status(400).json({
            success: false,
            message: "review is not present"
        });
    }
    let avg = 0;
    reviews.forEach(rev => {
        avg += rev.rating;
    });
    ratings = avg / reviews.length;
    noofReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId,
        {
            reviews,
            ratings,
            noofReviews,
        },
        {
            new: true,
            runValidators: true,
            userFindAndModify: false,
        }
    );
    res.status(200).json({
        success: true,
    });
    console.log(ratings);
});