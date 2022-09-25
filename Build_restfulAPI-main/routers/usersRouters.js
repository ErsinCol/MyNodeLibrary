const express=require('express');
const bcrypt=require('bcrypt');

const routers=express.Router();
const usersModel=require('../model/userModel');
const createError=require('http-errors');
const adminMiddleware=require('../middlewares/adminMiddleware');
const tokenMiddlewares=require('../middlewares/tokenMiddlewares');

routers.get('/',[tokenMiddlewares,adminMiddleware],async (req,res)=>{
    const allUsers=await usersModel.find({});
    res.json(allUsers);
});

routers.get('/me',tokenMiddlewares, async (req,res,next)=>{
   res.json(req.user);
});
routers.patch('/me',tokenMiddlewares, async (req,res,next)=>{
    delete req.body.createdAt;
    delete req.body.updatedAt;  
    

    const {error,value}= usersModel.withJoiValidaitonForUpdate(req.body);

    if(req.body.hasOwnProperty('password')){
        req.body.password=await bcrypt.hash(req.body.password,8);
    }

    if(error){
        next(createError(400,error));
    }else{
        try{
            const result=await usersModel.findByIdAndUpdate({_id:req.user._id},req.body,{new:true,runValidators:true});
        }catch(err){
            next(createError(400,err));
        }
    }
    
});

routers.post('/',async (req,res,next)=>{
    try{
        const insertedUser=new usersModel(req.body);
        insertedUser.password= await bcrypt.hash(insertedUser.password,8);
        const {error,value}=insertedUser.withJoiValidation(req.body);
        if(error){
            next(createError(400,error));
        }else{
            const result=await insertedUser.save(insertedUser);
            res.json(result);
        }
        
    }catch(err  ){
        next(err);
        console.log('user kaydederken hata: '+err);
    }
});

routers.post('/input',async (req,res,next)=>{
    try{
        const user = await usersModel.input(req.body.email,req.body.password);
        const token =await user.generateToken();
        res.json({
            user,
            token
        });
    }catch(err){
        next(err);
    }
    
})

routers.patch('/:id',async (req,res,next)=>{
    delete req.body.createdAt;
    delete req.body.updatedAt;  
    

    const {error,value}= usersModel.withJoiValidaitonForUpdate(req.body);

    if(req.body.hasOwnProperty('password')){
        req.body.password=await bcrypt.hash(req.body.password,8);
    }

    if(error){
        next(createError(400,error));
    }else{
        try{
            const result=await usersModel.findByIdAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true});
            if(result){
               return res.json(result);
            }else{
                return res.json({
                    message: "güncellenecek kullanıcı bulunamadı"
                });
            }
        }catch(err){
            next(createError(400,err));
        }
    }
    
});

routers.get('/deleteAll',[tokenMiddlewares,adminMiddleware],async function (req,res,next){
    try{
        const result=await usersModel.deleteMany({isAdmin:false});
        if(result){
            res.json({
                mesaj: "tüm kullanıcılar silindi"
            });
        }else{
            throw createError(404,'Not found any user');
        }
    }catch(err){
        next(createError(400,err));
    }
})

routers.delete('/me',tokenMiddlewares,async (req,res,next)=>{
    try{
        const result=await usersModel.findByIdAndDelete({_id:req.user._id});
        if(result){
            return res.json({
                message:"kullanıcı silindi"
            });
        }else{
            throw createError(404,'Not found user');
        }
    }catch(err){
        next(createError(400,err));
    }
});


module.exports=routers;