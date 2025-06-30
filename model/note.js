const mongoose = require("mongoose")

const{model,Schema} = mongoose

const noteSchema = new Schema({
    title:{
        type:String,
        required:true,
        maxLength:30
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        default:"unknown"
    },
    cover_photo:{
        type:String
    }
},{
    timestamps:true})

module.exports = model("note",noteSchema)