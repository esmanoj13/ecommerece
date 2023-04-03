const mongoose=require("mongoose");
 const connectTodb=()=>{
  

    mongoose.connect(process.env.DB_URI,{ useNewUrlParser:true, useUnifiedTopology: true}).then((data)=>{
        console.log(`mongoose is connected:${data.connection.host}`);
    }).catch((err)=>{
        console.log(err);
    })
 }
 module.exports =connectTodb;

