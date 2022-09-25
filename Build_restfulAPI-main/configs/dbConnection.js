const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/Users')
    .then(()=>{
        console.log('veri tabanı bağlantısı sağlandı');
    })
    .catch(()=>{
        console.log('HATA!! Veri tabanı bağlantısı kurulamadı.');
    })