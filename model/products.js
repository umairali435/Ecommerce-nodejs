const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
name:{
    type:String,
},
price:{
type:String,
},
description:{
type:String,
}
});
module.exports=mongoose.model("Products",productSchema);