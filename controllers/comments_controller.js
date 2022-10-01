const Comment=require('../models/comment')
const Post=require('../models/post')
const { post } = require('../routes')

const commentMailer=require('../mailers/comments_mailer')

module.exports.create=async function(req,res){

    //first we find that the comment is made on available post or not
       let post=await Post.findById(req.body.post)

        if(post){
           let comment= await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            })

                //updating adding the comment id to the post model
                post.comments.push(comment);     // it will automatically push the comment id in the post.js module
                post.save()
                //after every update we must save it
                 comment=await comment.populate('user','name email')
                 commentMailer.newComment(comment)
                res.redirect('/')
            
        }else{
            console.log("Post does not exsist")
        }
    }



//I have to remove the contents from two position one from the comment other from  the comments array in post
module.exports.destroy=function(req,res){

    Comment.findById(req.params.id,function(err,comment){

        if(comment.user==req.user.id)
        {
            let postId=comment.post;
            comment.remove()

            //deleting the id of comment and update
            Post.findByIdAndUpdate(postId,{$pull :{comments:req.params.id}},function(err,post){         //this is a inbuilt function grom the comments array of the post just pull out the comment of a particualar id
                return res.redirect('back')
            })    
        }else
        {
            return res.redirect('back')
        }
    })
}