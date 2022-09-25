const mongoose=require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION)
    .then(()=>{
        console.log('veri tabanına bağlantı sağlandı');
    })
    .catch(error=> console.log(`veritabanı bağlantı hatası ${error}`));