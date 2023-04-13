const express=require("express");
const { getallProducts, createProduct ,replaceProduct, deleteProduct, getproductDeatail} = require("../Controller/productController");
const router= express.Router();
const { isauth ,authorizerole } = require("../middleware/auth");
// isauth is used for login user and authorizerole("admin") used for given the authrization to the user

router.route("/products").get(getallProducts);
router.route("/product/new").post(isauth,authorizerole("admin"),createProduct);
router.route("/product/:id").put(isauth,authorizerole("admin"),replaceProduct).delete(isauth,authorizerole("admin"),deleteProduct).get(getproductDeatail);;
module.exports=router;