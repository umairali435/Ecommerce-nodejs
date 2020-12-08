const express= require("express");
const router=express.Router();
const mongoose=require("mongoose");
const bcypt=require("bcrypt");
const jwt =require("jsonwebtoken");
const User=require("../model/user");
const tokenauth=require("../Auth/authtoken");
router.post("/",(req,res,next)=>{
    User.find({email:req.body.email}).exec().then(user=>{
        if(user.length>=1){
            res.status(409).json({
                message:"User already exists by this email",
            });
        }else{
            
     bcypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
           return res.status(500).json({
                error:err,
            });
        }else{
            const user=User({
               _id:mongoose.Types.ObjectId(),
               email:req.body.email,
               password:hash,
            });
           user.save().then(result=>{
               
               res.status(201).json({
                   message:"Register user Successfully",
               });
           }).catch(err=>{
               res.status(500).json({
                   message:"Please Proivde a valid Email Address"
               })
               error:err,
               console.log(err);
           }); 
        }
    });
        }
    });
});
router.post("/login",(req,res,next)=>{
     User.find({email:req.body.email,
     }).exec().then(result=>{
         if(result.length<1){
             res.status(500).json({
                 message:"Auth failed"
             });
         }
         bcypt.compare(req.body.password,result[0].password ,(err,results)=>{
            if(err){
               return res.status(500).json({
                    message:"Auth failed",
                });
            }
            if(results){
                const token=jwt.sign({
                 email:result[0].email,
                 _id:result[0]._id,
                },"Secret",{
                    expiresIn:"1h",

                });
                return res.status(200).json({
                    message:"Login Successfully",
                    token:token,
                });
            }
            res.status(500).json({   
                message:"Auth failed",  
            });
        });
     }).catch(err=>{
         error:"Error while Login ";
         console.log(err);
     })
});
router.get("allusers",(req,res,next)=>{
    const user=User().exec().then(result=>{
        res.status(200).json({
            message:result.email,
        });
    });
})
router.delete("/:userId",(req,res,next)=>{
    User.remove({_id:req.params.userId}).exec().then(result=>{
        res.status(200).json({
            message:"your Account has been deleted"
        });
    }).catch(err=>{
        res.status(500).json({
            
            err:err,
            error:"Some Error Occur",
        });
        console.log(err);
    });
});
module.exports=router;