const {validationResult}=require('express-validator');
const UserModel=require('../model/UserModel');
const showLoginForm= function (req,res,next){
    res.render('login',{layout: './layout/auth_layout.ejs'});
}
const doLogin=function(req,res,next){
    console.log(req.body);
    res.render('login',{layout: './layout/auth_layout.ejs'});
}
const showRegisterForm= function (req,res,next){
    res.render('register',{layout: './layout/auth_layout.ejs'});
}
const createRegister=async function(req,res,next){
    const errors=validationResult(req);
    if(!errors.isEmpty()){ 
        req.flash('name',req.body.name);
        req.flash('surname',req.body.surname);
        req.flash('email',req.body.email);
        req.flash('password',req.body.password);
        req.flash('repeatPassword',req.body.repeatPassword);
        req.flash('validation_error',errors.array());
        res.redirect('/register')
    } else{
        try{
                const _user= await UserModel.findOne({email:req.body.email})
                if(_user){
                    req.flash('validation_error',[{msg:'sistemimizde kayıtlı email girdiniz,lütfen tekrar deneyiniz...'}]);
                    req.flash('name',req.body.name);
                    req.flash('surname',req.body.surname);
                    req.flash('email',req.body.email);
                    req.flash('password',req.body.password);
                    req.flash('repeatPassword',req.body.repeatPassword);
                    res.redirect('/register');
                }else{
                    const newUser=new UserModel({
                        name:req.body.name,
                        surname:req.body.surname,
                        email:req.body.email,
                        password:req.body.password
                    });
                    await newUser.save();
                    console.log('kullanıcı kaydedildi');
                }
        }catch(err){

        }
    }
   
 } 
    
const showForgotPasswordForm=function(req,res,next){
    res.render('forgotPassword',{layout: './layout/auth_layout.ejs'});
}
const resetPassword=function(req,res,next){
    console.log(req.body);
    res.render('forgotPassword',{layout: './layout/auth_layout.ejs'});
}

module.exports={
    showLoginForm,
    showRegisterForm,
    showForgotPasswordForm,
    createRegister,
    doLogin,
    resetPassword,
}