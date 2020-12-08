const express=require("express");
const app=express();
app.send("/start",(req,res,next)=>{
    res.send("server is running");
});
app.listen(3000,()=>console.log("your server is running"));