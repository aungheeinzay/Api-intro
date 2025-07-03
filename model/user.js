const mongoose = require("mongoose")

const {Schema,model} = mongoose

const userSchema = new Schema({
    username:{
        type:String,
        maxLength:17,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        requird:true,
        minLength:4,
    }
},{
    timestamps:true
})
const User = model("user",userSchema)

module.exports  = User