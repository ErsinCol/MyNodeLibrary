const catchError= (err,req,res,next)=>{

    console.log(err);
    
    if(err.code === 11000){
        return res.json({
            hataKodu: 400,
            mesaj: Object.keys(err.keyValue)+ " için girdiğiniz "+ Object.values(err.keyValue)+" daha önceden veri tabanında olduğu için tekrar eklenemez veya güncellenemez"
        });
    }
    res.json({
        hataKodu: err.statusCode,
        mesaj: err.message,
    })
}

module.exports=catchError;