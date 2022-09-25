require('dotenv').config({path: './.env'});
const express=require('express');
require('./configs/dbConnection');
const userRouters=require('./routers/usersRouters');
const errorMiddleware=require('./middlewares/errorMiddlewares');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/users',userRouters);

app.use(errorMiddleware);

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server is listening port on ${port}`);
});