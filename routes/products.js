const express= require("express");
const router=express.Router();
const mongoose=require("mongoose");
const products = require("../model/products");
const Products=require("../model/products");

router.post("/products",(req,res,next)=>{
 const products=Products({
     _id:mongoose.Types.ObjectId(),
     name:req.body.name,
     price:req.body.price,
     description:req.body.description,
 });
 products.save().then(result=>{
     res.status(200).json({
        success:"true",
        message:"Product posted Successfully."
     });

 }).catch(err=>{
     res.status(500).json({
         success:"false",
         message:"Product not posted ",
         error:err,
     })
 });
});
router.get("produstsget",(req,res,next)=>{
products.find().then(result=>{
res.status(200).json({
    success:"true",
});
});
});
module.exports=router;