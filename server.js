const http =require("http");
const express=require("express");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const app = express();
const morgan=require("morgan");

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
mongoose.connect("mongodb://localhost:27017/Drivu",{ useNewUrlParser: true },{ useUnifiedTopology: true });
mongoose.Promise=global.Promise;
const userRouter=require("./routes/user");
const products=require("./routes/products");
app.use("/user",userRouter);
app.use("/",products);
app.use(morgan("dev"));
app.get("/data",(req,res)=>{
    res.send("hello from me");
});

app.listen(3000);