const User = require("../model/user")
const {validationResult} = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.register=async(req,res)=>{
    const {username,email,password} = req.body
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()[0],
            message:"validation fail"
        })
    }
   try{
    const hashPassword =await bcrypt.hash(password,10)
    await User.create({
        username,
        email,
        password:hashPassword
    })
    return res.status(200).json({
        message:"register success"
    })

   }catch(err){
    console.log(err);
    
   }

}

exports.login=async(req,res)=>{
    const {email,password} = req.body
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()[0],
            message:"validation fail"
        })
    }
   try{
     const user = await User.findOne({email})
    if(user){
        const isMatch = bcrypt.compareSync(password,user.password)
        if(isMatch){
            const jwtToken = jwt.sign({email:user.email,userId:user._id},process.env.JWT_KEY,{expiresIn:"1h"})
            return res.status(200).json({
                message:"login success",
                jwtToken,
                userId:user._id
            })
        }else{
            return res.status(400).json({
                error:{
                    msg:"wrong email or password"
                }
            })
        }
}
   }catch(err){
    console.log(err);
   }
}