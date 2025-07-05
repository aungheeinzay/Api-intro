const Note =require("../model/note")
const {deleteFile} =require("../utils/delete")

const {validationResult} = require("express-validator")
const { login } = require("./auth")
const { findOne } = require("../model/user")

exports.getAllNote=async(req,res,next)=>{
    let {page} = req.query 
    let totalNotes;
    let perNote=6;
    let totalPages;

    try{
        totalNotes=await Note.countDocuments();
        totalPages=Math.ceil(totalNotes/perNote)
        const notes = await Note.find().populate("userId", "username email")
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
    console.log(req.userId);
    
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
    cover_photo:cover_photo?.path,
    userId:req.userId
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
        const note = await Note.findById(noteId).populate("userId","username email")
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
        const anote = await Note.findOne({_id:noteId})
        if(anote.userId.toString()===req.userId.toString()){
        const note = await Note.findById(noteId)
        if(note.cover_photo){
            deleteFile(note.cover_photo)
        }
        await Note.findByIdAndDelete(noteId)
        return res.status(204).json({
            message:"note was deleted"
        })
    }
    return res.status(401).json({
        message:"unauthorized"
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
        if(note.userId.toString()===req.userId.toString()){
        note.title=title;
        note.content=content;
        if(cover_photo && note.cover_photo){
         deleteFile(note.cover_photo)  
        }
        if(cover_photo){
            note.cover_photo=cover_photo.path;
        }
        
        await note.save()
        return res.status(200).json({
            message:"note updated"
        })
    }
    return res.status(401).json({
        message:"authorization fail"
    })

    }catch(err){
        console.log(err);
        res.status(404).json({
            message:"something wrong"
        })
    }
}