const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const bodyParser = require("body-parser")
const cors = require("cors")
const multer = require("multer")

app.use("/uploads",express.static(path.join(__dirname,"uploads")))
const noteRouter = require("./routes/note")
const userRouter = require("./routes/auth")

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads")
    },
    filename:function(req,file,cb){
        const unique = Date.now()+'_'+Math.round(Math.random()*1E9)
        cb(null,unique+'Dnote.io'+file.originalname)
    }
})

const filterConfigure =function(req,file,cb){
    if(file.mimetype === 'image/png' ||
       file.mimetype === 'image/jpg' ||
       file.mimetype === 'image/jpeg'
    ){
        cb(null,true)
    }else{
        cb(null,false)
    }
}


app.use(multer({storage,fileFilter:filterConfigure})
.single("cover_photo"))
app.use(cors())
app.use(bodyParser.json())


app.use(noteRouter)
app.use(userRouter)


mongoose.connect(process.env.MONGODB_URL).then(
    (_)=>{
        console.log("connected to mongodb")
        app.listen(3000)
    }
).catch(err=>console.log(err))