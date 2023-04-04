const mongoose=require("mongoose");
 const connectTodb=()=>{
  

    mongoose.connect(process.env.DB_URI,{ useNewUrlParser:true, useUnifiedTopology: true}).then((data)=>{
        console.log(`mongoose is connected:${data.connection.host}`);
    })
    // This is commet due to we handle catch by the uncaught error(2)
    // .catch((err)=>{
    //     console.log(err);
    // })
 }
 module.exports =connectTodb;

