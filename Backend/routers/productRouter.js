const express=require("express");
const { getallProducts, 
    createProduct ,
    replaceProduct, 
    deleteProduct, 
    getproductDeatail,
    cretaeProductRating,
    getallreviews,
    deleteReview
} = require("../Controller/productController");
const router= express.Router();
const { isauth ,authorizerole } = require("../middleware/auth");
// isauth is used for login user and authorizerole("admin") used for given the authrization to the user

router.route("/products").get(getallProducts);
router.route("/admin/product/new").post(isauth,authorizerole("admin"),createProduct);
router.route("/admin/product/:id").put(isauth,authorizerole("admin"),replaceProduct)
.delete(isauth,authorizerole("admin"),deleteProduct);
router.route("/product/:id").get(getproductDeatail);
router.route("/review").put(isauth,cretaeProductRating);
router.route("/reviews").get(getallreviews).delete(isauth,deleteReview);
module.exports=router;