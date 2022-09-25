const jwt=require('jsonwebtoken');
const User =require('../model/userModel');
const checkToken= async(req,res,next)=>{

    try{
        const token= req.header('Authorization');
        const result=await jwt.verify(token,process.env.SECRETKEY);
        console.log(result);
        req.user= await User.findById(result._id);
        next();
    }catch(err){
        next(err);
    }
}

module.exports=checkToken;