require('dotenv').config({path:'../.env'});
console.log(process.env.PORT);
const express=require('express')
    , util = require('util'); 
const session = require('express-session');
const app=express();
const ejs=require('ejs');
const expressLayouts=require('express-ejs-layouts');
const path=require('path');
const authRouter=require('./routers/authRouter');
const flash= require('connect-flash');
require('./configs/dbConnect');
const MongoDBStore = require('connect-mongodb-session')(session);
var sessionStore = new MongoDBStore({
  uri: process.env.MONGODB_CONNECTION,
  collection: 'Sessions'
});
    app.use(session({
        secret:process.env.SESSION_SECRET,  // a random unique string key used to authenticate a session.It is stored in an environment variable and can’t be exposed to the public.
        resave: false, // istek sırasında oturum hiç değiştirilmemiş olsa bile oturumu geri kaydetmeye zorlar istenmeyen bir durum çünkü istemci sunucuya iki paralel istekte bulunabilir
        saveUninitialized: true, // oturum oluşturulduğunda ancak değişmediğinde başlatılmamış olarak kaydetme özelliği
        cookie:{ // çerez son geçerlilik tarihini ayarlar
            maxAge:86400000 , // 5 saniye sonra browserdan silinsin 
        },
        store: sessionStore,
    }))
    app.use(flash());
    app.use(function (req,res,next){
        res.locals.validation_error = req.flash('validation_error');
        res.locals.name=req.flash('name');
        res.locals.surname=req.flash('surname');
        res.locals.email=req.flash('email');
        res.locals.password=req.flash('password');
        res.locals.repeatPassword=req.flash('repeatPassword');
        next();
    });
    app.use(express.urlencoded({extended:true}));
   
    app.set('view engine','ejs');
    app.set('views',path.resolve(__dirname,'./views'));
    app.use(expressLayouts);
    app.use(express.static('../public'));
    app.use('/',authRouter);



let sayac=0;
app.get('/', (req,res)=>{
    
    if(req.session.sayac){
        req.session.sayac++;
    }else{
        req.session.sayac=1
    }
    res.json({
        mesaj: 'merhaba',
        sayac: req.session.sayac,
    });
    console.log(JSON.stringify(req.session));
});



app.listen(process.env.PORT,()=>{
    console.log(`server ${process.env.PORT} portunda ayaklandı`);
});