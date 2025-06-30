const Note =require("../model/note")
const {deleteFile} =require("../utils/delete")

const {validationResult} = require("express-validator")

exports.getAllNote=async(req,res,next)=>{
    let {page} = req.query 
    let totalNotes;
    let perNote=6;
    let totalPages;

    try{
        totalNotes=await Note.countDocuments();
        totalPages=Math.ceil(totalNotes/perNote)
        const notes = await Note.find()
        .skip((page-1)*perNote)
        .limit(perNote)
        .sort({createdAt:-1})
        return res.status(200).json({
            notes,
            totalPages
        })
    }catch(err){
        console.log(err);
        res.status(404).json({
            message:"something went wrong"
        })
    }
}
exports.createNote=async(req,res,next)=>{
    const {title,content} =req.body
    const cover_photo = req.file
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
    content,
    cover_photo:cover_photo?.path
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
        const note = await Note.findById(noteId)
        if(note.cover_photo){
            deleteFile(note.cover_photo)
        }
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
    const cover_photo = req.file;

    try{
        const note = await Note.findById(noteId)
        note.title=title;
        note.content=content;
        if(cover_photo){
         deleteFile(note.cover_photo)  
         note.cover_photo=cover_photo.path ;
        }
        
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