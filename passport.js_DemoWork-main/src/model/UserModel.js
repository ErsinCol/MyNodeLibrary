const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minLength: 3,
    },
    surname:{
        type: String,
        required: true,
        trim: true,
        minLength: 3,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowwercase: true,
    },
    password:{
        type: String,
        required: true,
        trim:true,
        min:6,
        max:12
    },
},{collection:'Users',timestamps:true})

const Users=mongoose.model('Users',UserSchema);

module.exports=Users;