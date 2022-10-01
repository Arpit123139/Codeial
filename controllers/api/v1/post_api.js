const Post=require('../../../models/post')
const Comment=require('../../../models/comment')

module.exports.index=async function(req,res){

    
    let posts = await Post.find({})
    .sort('-createdAt')      // THE post which was created earlier appear at the top and sorting occurs
    .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
   

    return res.json(200,{
        message:"List of Posts",
        posts:posts
    })
}

module.exports.destroy = async function (req, res) {
    console.log("*****************************************")

    try {
        let posts = await Post.findById(req.params.id)
       
        if(posts.user==req.user.id){

            posts.remove()
            await Comment.deleteMany({ post: req.params.id })

           return res.json(200,{
            message:"post and comment associated with it deleted"
           })
            
        }else{
            return res.json(401,{
                message:"You Are Not Authorized To Delete the post"
            })
        }
        


    } catch (err) {
        console.log('Error*****************************************', err)
        return res.json(500,{
            message:"Internal Server Error"
        })

    }

}