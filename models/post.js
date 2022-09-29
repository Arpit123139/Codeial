const mongoose=require('mongoose')

const postSchema =new mongoose.Schema({

    content:{

        type:String,
        required:true
    },
    user:{           // linking the post to the User
        type:mongoose.Schema.Types.ObjectId ,     // reffering to the objectId in Robo3T
        ref:'User'            //we have exported it in users.js
    }
},{
    timestamps:true
})

const Post=mongoose.model('Post',postSchema)

module.export=Post