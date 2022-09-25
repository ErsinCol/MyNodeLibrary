const isAdmin= (req,res,next)=>{
    if(!req.user.isAdmin){
        return res.status(403).json({
            mesaj: "Sadece adminin yetkisi var, erişiminiz engellendi"
        });
    }
    next();
}

module.exports=isAdmin;