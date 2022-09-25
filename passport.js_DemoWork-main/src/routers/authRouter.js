const router= require('express').Router();
const authControllers=require('../controllers/authController');
const validationMiddleware=require('../middlewares/validationMiddleware');


router.get('/login',authControllers.showLoginForm);
router.get('/register',authControllers.showRegisterForm);
router.post('/register',validationMiddleware.validateNewUser(),authControllers.createRegister);
router.post('/login',authControllers.doLogin);
router.get('/forgot-password',authControllers.showForgotPasswordForm);
router.post('/forgot-password',authControllers.resetPassword);


module.exports=router;