const mongoose=require('mongoose');
const createError=require('http-errors');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const Joi=require('@hapi/joi');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength:3,
        maxLength:50,
        lowerCase:true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowerCase: true,
    },
    phoneNumber:{
        type:Number,
        trim:true,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        trim: true,
        reequired: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
},{collection:'usersInfo' , timestamps:true});



userSchema.methods.withJoiValidation=function(userObject){

    const schema=Joi.object({
        name: Joi.string().required().trim().min(3).max(50),
        email: Joi.string().required().trim().lowercase().email(),
        phoneNumber: Joi.number().integer().required(),
        password: Joi.string().trim().required()
    });

    return schema.validate(userObject);
}

userSchema.statics.withJoiValidaitonForUpdate= function(userObject){

    const schema=Joi.object({
        name: Joi.string().trim().min(3).max(50),
        email: Joi.string().trim().lowercase().email(),
        phoneNumber: Joi.number().integer(),
        password: Joi.string().trim()
    });

    return schema.validate(userObject);
}

    
userSchema.statics.input=async function (userEmail,userPassword){
    const user =await usersModel.findOne({email: userEmail});
    if(!user){
        throw createError(400,"kullanıcı bulunamadı");
    }
    const checkPassword=await bcrypt.compare(userPassword,user.password);
    if(!checkPassword){
        throw createError(400,"girilen şifre hatalı");
    }
    return user;

}

userSchema.methods.toJSON= function(){
    const user = this.toObject();
    delete user._id;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.password;
    delete user.__v;

    return user;
}

userSchema.methods.generateToken = async function () {
    const user = this;
    const token = await jwt.sign({_id:user._id},process.env.SECRETKEY,{expiresIn:'1h'});
    return token; 
}


const usersModel = mongoose.model('usersInfo',userSchema);


module.exports = usersModel;