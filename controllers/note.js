const Note =require("../model/note")

const {validationResult} = require("express-validator")

exports.getAllNote=async(req,res,next)=>{
    try{
        const notes = await Note.find()
        .sort({createdAt:-1})
        return res.status(200).json(notes)
    }catch(err){
        console.log(err);
        res.status(404).json({
            message:"something went wrong"
        })
    }
}
exports.createNote=async(req,res,next)=>{
    const {title,content} =req.body
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            message:"validation fail",
            errors:error.array()[0]
        })
    }
  try{
     await Note.create({
    title,
    content
   })
   return res.status(200).json({
        message:"note is created"
    })
  }catch(err){
    console.log(err);
    res.status(404).json({
        message:"something went wrong"
    })
  }

}

exports.getNote=async(req,res)=>{
    const {noteId} = req.params;
    try{
        const note = await Note.findById(noteId)
        res.status(200).json(note)
    }catch(err){
        console.log(err);
        res.status(404).json({
            message:"something wrong"
        })
    }
}

exports.deleteNote=async(req,res)=>{
    const {noteId} = req.params
    try{
        await Note.findByIdAndDelete(noteId)
        res.status(204).json({
            message:"note was deleted"
        })
    }catch(err){
        console.log(err);
        
    }

}

exports.updateNote=async(req,res)=>{
    const {noteId} = req.params;
    const{title,content}=req.body;

    try{
        const note = await Note.findById(noteId)
        note.title=title;
        note.content=content
        await note.save()
        res.status(200).json({
            message:"note updated"
        })

    }catch(err){
        console.log(err);
        res.status(404).json({
            message:"something wrong"
        })
    }
}