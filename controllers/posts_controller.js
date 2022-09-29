const Post=require('../models/post')

module.exports.create=function(req,res){
    
    Post.create({
        content:req.body.content,           // the first content is from the post.js in which we created a Schema 
        user:req.user._id
    },function(err,post){

        if(err){
            console.log("Error in creation a Post")
            return;
        }
        return res.redirect('back')
    })
}