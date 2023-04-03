const Product=require("../Models/productModel");

// It is used to create product
exports.createProduct=async (req,res,next)=>{
    const product= await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    });
}
// To get the product details of the product
exports.getproductDeatail = async (req,res,next)=>{
    const product= await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product detail is not available"
        })
    }
    res.status(200).json({
        success:true,
        product
    })
}
// It is used to create all thre products
exports.getallProducts= async (req,res)=>{
const products= await Product.find(req.body);
res.status(200).json({
    success:true,
    products
});
}

// it is used to update the product -for this we use id 
exports.replaceProduct=async (req,res,next)=>{
    let product= await Product.findById(req.params.id);// here params is used to get particulat id of the product
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product is not found"
        })
    };
 rproduct=await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
 })
 res.status(200).json({
    success:true,
    product
 })
}
 // It is used to delete the product
 exports.deleteProduct = async (req,res,next)=>{
    let product= await Product.findById(req.params.id); 
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product is not found"
        })
    }
   await product.deleteOne();
    res.status(200).json({
        success:true,
        message:"Product is deleted"
    });
 }