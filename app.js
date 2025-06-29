const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const bodyParser = require("body-parser")
const cors = require("cors")


const noteRouter = require("./routes/note")

app.use(cors())
app.use(bodyParser.json())
app.use(noteRouter)
mongoose.connect(process.env.MONGODB_URL).then(
    (_)=>{
        console.log("connected to mongodb")
        app.listen(3000)
    }
).catch(err=>console.log(err))