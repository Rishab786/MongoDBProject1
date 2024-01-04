const express = require('express');
const userController = require('../controllers/users');
const authController = require("../middleware/authentication");
const router = express.Router();

router.post('/signup',userController.signup);
router.post('/login',userController.login); 
router.get('/dashboard',userController.getUserDashboard);
router.get('/userstatus',authController.authorization,userController.getUserStatus);
router.get('/registeredSuccessfully',userController.getRegisteredSuccessfully);

module.exports = router;