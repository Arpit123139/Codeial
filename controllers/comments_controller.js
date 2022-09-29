const Comment=require('../models/comment')
const Post=require('../models/post')

module.exports.create=function(req,res){

    //first we find that the comment is made on available post or not
    Post.findById(req.body.post,function(err,post){

        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){

                //updating adding the comment id to the post model
                post.comments.push(comment);     // it will automatically push the comment id in the post.js module
                post.save()

                res.redirect('/')
            })
        }else{
            console.log("Post does not exsist")
        }
    })

}