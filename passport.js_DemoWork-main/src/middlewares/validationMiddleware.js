
const { body } = require('express-validator');




const validateNewUser= function() {
       

    return [
        body('name')
            .trim()
            .isLength({min:3}).withMessage('İsim en az üç karakter olmalıdır...'),
        body('surname')
            .trim()
            .isLength({min:3}).withMessage('Soyisim en az üç karakter olmalıdır...'),
        body('email')
            .trim()
            .isEmail().withMessage('Geçerli bir mail adresi giriniz...'),
        body('password')
            .trim()
            .isLength({min:6}).withMessage('Şifre en az 6 karakter olmalıdır...')
            .isLength({max:12}).withMessage('Şifre en cok 12 karakter olmalıdır'),
        body('repeatPassword')
            .trim()
            .custom((value,{req})=>{
                if(value !== req.body.password){
                    throw new Error('girilen şifreler uyuşmuyor');
                }
                return true;
        })
    ];
    
}

module.exports={
    validateNewUser,
}