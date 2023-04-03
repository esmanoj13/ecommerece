const express=require("express");
const { getallProducts, createProduct ,replaceProduct, deleteProduct, getproductDeatail} = require("../Controller/productController");
const router= express.Router();


router.route("/products").get(getallProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(replaceProduct).delete(deleteProduct).get(getproductDeatail);;
module.exports=router;