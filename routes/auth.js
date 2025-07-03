const express = require("express")
const router = express.Router()
const {body} = require("express-validator")
const User = require("../model/user")
const authController = require("../controllers/auth")
const {isToken} =require("../middleware/isToken")

router.post("/register",
[
    body("email")
    .isEmail()
    .withMessage("invilid email")
    .custom((value)=>{
    return User.findOne({email : value}).then((user)=>{
        if(user){
        return Promise.reject("email already exit")
        }
        return true
    })
    }),
    body("password")
    .isLength({min:4})
    .withMessage("invilid password")
    .custom((value)=>{
        const specialCharacter=["@","!","#","$","&","*","^"]
        const spcHave= specialCharacter.some(s=>value.includes(s))
        if(!spcHave){
            return Promise.reject("password have special character")
        }else{
            return true
        }
    })

],authController.register)

router.post("/login",
[
     body("email")
    .isEmail()
    .withMessage("invilid email")
    .custom((value)=>{
    return User.findOne({email : value}).then((user)=>{
        if(!user){
        return Promise.reject("email is not exit")
        }
        return true
    })
    })
],authController.login)

//get/status

router.get("/status",isToken)
module.exports = router