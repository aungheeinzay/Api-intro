const jwt = require("jsonwebtoken")
require("dotenv").config()
exports.isToken=(req,res,next)=>{
    const authHeader = req.get("Authorization")
    
    
    if(!authHeader){
        return res.status(401).json({
            message:"not autheniticated"
        })
    }
    const token = authHeader.split(' ')[1]
    try{
       const isMatchToken =  jwt.verify(token,process.env.JWT_key)
       if(!isMatchToken){
          return res.status(401).json({
            message:"not authenicated"
        })
       }
       req.userId=isMatchToken.userId;
       next()

    }catch(err){
        return res.status(401).json({
            message:"not authenicated"
        })
    }
}
