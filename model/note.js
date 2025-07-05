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
    cover_photo:{
        type:String
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required: true
    }
},{
    timestamps:true})

module.exports = model("note",noteSchema)