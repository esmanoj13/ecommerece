const mongoose = require("mongoose");

// This is used to create product schema for product in database
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name"]
    },
    description: {
        type: String,
        required: [true, "Please enter the description name"]
    },
    category: {
        type: String,
        required: [true, "Please enter the category name"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the price"],
        maxLength: [8, "Price shouldn't be greater than 8 digit"]
    },
    stock: {
        type: Number,     
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    productImage: [{
        productId: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
    ],
    countrating: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String
                
            },
            rating: {
                type: Number,
                default: 0
            },
            comment: {
                type: String
            
            }
        }
    ],
    createdat: {
        type: Date,
        createdat: new Date
    }
}
)
// this is used to exprt the product schema to controller
module.exports = mongoose.model("Product", productSchema);