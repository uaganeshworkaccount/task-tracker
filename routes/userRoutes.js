const express=require('express');
const userroutes=express.Router();
const userController=require('../controller/userController')
const isAuthUser=require("../middleware/userauth");

userroutes.post('/login',userController.login);
userroutes.get('/logout',userController.logout);
userroutes.post('/register',userController.register);
// userroutes.post('/checkUser',userController.checkUser)
userroutes.post('/userexist',userController.userExist)
userroutes.post('/emailexist',userController.emailExist)
userroutes.get('/users',userController.userList);



module.exports=userroutes;