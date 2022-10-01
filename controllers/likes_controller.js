const Like=require('../models/like')
const Comment=require('../models/comment')
const Post=require('../models/post')


module.exports.toggleLike=async function(req,res){
    console.log("*************************************************************")

    try {

        //url----> likes/toggle/?id=abcde&type=Post/Comment
        let likeable
        let deleted=false     // if deleted is true the post hs been already liked so decrease the count number 

        if(req.query.type=='Post'){
            likeable=await Post.findById(req.query.id).populate('likes')
            

        }else{
            likeable=await Comment.findById(req.query.id).populate('likes')
        }

        //check if a like already exsist
        let exsistingLike=await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })

        if(exsistingLike){
            //deleting from the array
            likeable.likes.pull(exsistingLike._id);
            likeable.save()
            exsistingLike.remove()
            deleted=true

        }else{
            let newLike=await Like.create({
                user:req.user,
                likeable:req.query.id,
                onModel:req.query.type
            })

            likeable.likes.push(newLike)
            likeable.save()

        }
        

        return res.redirect('/')
        
    } catch (err) {
        console.log(err)
        return res.json(500,{
            message:'Internal Server Error'
        })
        
    }
}