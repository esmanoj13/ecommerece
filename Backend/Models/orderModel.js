const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    ShippingInfo: {
        Address: {
            type: String,
            required: (true, "Please fill the Address")
        },
        city: {
            type: String,
            required: (true, "Please fill the city")
        },
        country: {
            type: String,
            required: (true, "Please fill the country")
        },
        pincode: {
            type: Number,
            required: (true, "Please fill the pincode")
        },
        phoneno: {
            type: Number,
            required: (true, "Enter the phone no.")
        },
    },
    OrderItems: [
        {
            name: {
                type: String,
                trim: true,
                required: (true, "Please fill the product name")
            },
            quantity: {
                type: Number,
                required: (true, "Please fill the pincode")
            },
            price: {
                type: Number,
                required: (true, "please enter the price")
            },
            image: {
                type: String,
                required: (true, "Please enter the image name")
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            }
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    paidAt:{
        type:Date, 
        default: Date.now,     
    },
    ItemPrice:{
        type:Number,
        required:true
    },
    TaxPrice:{
        type:Number,
        required:true
    },
    ShippingPrice:{
        type:Number,
        required:true
    },
    TotalPrice:{
        type:Number,
        required:true
    },
    orderstatus:{
        type:String,
        required:true,
        default:"Processing",
    },
    deliveredAt:Date,
    createdAt:{
        type:Date,
        default: Date.now,
    }
});

module.exports= mongoose.model("Order",orderSchema);