const fs=require('fs');
const {Client} =require('pg');

const client =new Client({
    user: "postgres",
    host: "localhost",
    database: "info_visitor",
    password: "postgres",
    port: 5432,
});

async function dbconnector(err,result){
    try{
        await client.connect();
    }catch(err){
        console.log(err);
    }
}
dbconnector();

const createVisitor= async(request,reply)=>{
    const visitor_ip=request.body['visitor_ip'];
    const referer=request.headers['host'];
    const user_agent=request.headers['user-agent'];
    const advertise_id=request.body['advertise_id']; 
   
    try{
        let result=await client.query(`CALL info_visitor('${visitor_ip}','${referer}','${user_agent}',${advertise_id});`);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error)
        return {error}
    }  
}

const home= async(request,reply)=>{
    const stream=fs.readFileSync('./public/index.html');
    reply.type('text/html').send(stream);
}

module.exports= {
    createVisitor,
    home,
}