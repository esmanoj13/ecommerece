const Product = require("../Models/productModel");
const Order = require("../Models/orderModel");
const Errorhandler = require("../utils/errorhandler");
const asyncerror = require("../middleware/catchasyncerror");

exports.neworder = asyncerror(async (req, res, next) => {
    const { ShippingInfo,
        OrderItems,
        paymentInfo,
        ItemPrice,
        TaxPrice,
        ShippingPrice,
        TotalPrice,
    } = req.body;
    const order = await Order.create({
        ShippingInfo,
        OrderItems,
        paymentInfo,
        ItemPrice,
        TaxPrice,
        ShippingPrice,
        TotalPrice,
        user: req.user._id,
        paidAt: Date.now()
    });
    res.status(200).json({
        success: true,
        order
    })
});

//get single order
exports.singleorder = asyncerror(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    //populate is used here because when user is already login then it connectt to user table
    if (!order) {
        return next(new Errorhandler(404, "Please create order"));
    }
    res.status(200).json({
        success: true,
        order
    });
})
// get logged in user order
exports.getall = asyncerror(async (req, res, next) => {
    const order = await Order.find({ user: req.user._id });
    if (!orders) {
        return next(new Errorhandler(404, "Order not find with this ID"));
    }
    res.status(200).json({
        success: true,
        order
    });
})
//get all order to admin
exports.getallorders = asyncerror(async (req, res, next) => {
    const orders = await Order.find();
    if (!orders) {
        return next(new Errorhandler(404, "Order not find with this ID"));
    }
    let totalamounts = 0;
    orders.forEach((order) => {
        totalamounts += order.TotalPrice;
    });
    res.status(200).json({
        success: true,
        totalamounts,
        orders
    })
})
// update order status
exports.updatestatus = asyncerror(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (order.orderstatus === "Delivered") {
        return next(new Errorhandler(404, "Order is delivered"));
    };
    order.OrderItems.forEach(async (ord) => {
        await newstatus(ord.product, ord.quantity);
    });
    order.orderstatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredat = Date.now();
    }
    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
    })
});
async function newstatus(id, quantity) {
    const product = Product.findById(id);
    product.stock -= quantity;
}
// delete order
exports.deleteorder = asyncerror(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new Errorhandler(404, "Order not find with this ID"));
    }
    await order.remove();
    res.status(200).json({
        success:true,
    });
});


