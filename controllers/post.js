exports.getPosts = (req,res,next)=>{
    res.status(200).json([
        {
            id:1,
            title:"first post",
            description:"first post description"
        },
        {
            id:2,
            title:"second post",
            description:"second post description"
        }
    ])
}   

exports.createPost=(req,res)=>{
    res.status(201).json({
        message:'post created',
        data:req.body
    })
}