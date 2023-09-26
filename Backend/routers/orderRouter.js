const express = require("express");
const { neworder, singleorder, getall, getallorders, updatestatus, deleteorder } = require("../Controller/orderController");
const router = express.Router();
const { isauth ,authorizerole } = require("../middleware/auth");
router.route("/order/new").post(isauth,neworder);
router.route("/order/:id").get(isauth,singleorder);
router.route("/admin/orders/me").get(isauth,authorizerole("admin"),getallorders);
router.route("/admin/orders/:id").put(isauth,authorizerole("admin"),updatestatus).delete(isauth,authorizerole("admin"),deleteorder);
module.exports=router;