const mongoose=require('mongoose')

const postSchema =new mongoose.Schema({

    content:{

        type:String,
        required:true
    },
    user:{           // linking the post to the User
        type:mongoose.Schema.Types.ObjectId ,     // reffering to the objectId in Robo3T
        ref:'User'            //we have exported it in users.js
    },
    //include the array of Id of all comments  this is done to get all the comments associated with the post directly
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'

        }
        
        
    ]
},{
    timestamps:true
})

const Post=mongoose.model('Post',postSchema)


module.exports=Post