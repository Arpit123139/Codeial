const Post=require('../models/post')
const Comment=require('../models/comment')

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

module.exports.destroy=function(req,res){
    
    Post.findById(req.params.id,function(err,post){

       
        //we use user.id instead of user._id because it converts the object id into string
        if(post.user._id == req.user.id)           // this is a authentication only the user which has created the post is able to delete its own post not others 
        {
             post.remove()
             Comment.deleteMany ({post:req.params.id},function(err){
                return res.redirect('back')
             })

        }else{
            return res.redirect('back')
        }
    })
}