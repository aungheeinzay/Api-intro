
const fs = require("fs")

exports.deleteFile=(file)=>{
    fs.unlink(file,(err)=>{
        console.log(err)
    })
}