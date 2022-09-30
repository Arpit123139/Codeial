const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.create = async function (req, res) {

    try {
        let post=await Post.create({
            content: req.body.content,           // the first content is from the post.js in which we created a Schema 
            user: req.user._id
        })

        if(req.xhr){
            return res.status(200).json({

                data1:{
                    post:post
                },
                message:"Post created!"
            })
        }
        return res.redirect('back')

    } catch (err) {
        console.log('Error', err)
        return;

    }

}

module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id)

        //we use user.id instead of user._id because it converts the object id into string
        if (post.user._id == req.user.id)           // this is a authentication only the user which has created the post is able to delete its own post not others 
        {
            post.remove()
            await Comment.deleteMany({ post: req.params.id })
            return res.redirect('back')

        } else {
            return res.redirect('back')
        }

    } catch (err) {
        console.log('Error', err)
        return;

    }

}