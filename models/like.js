const mongoose=require('mongoose')

//this is a polymorphic the likes can have two parents either post or comment so we make use of dynamic refernces
const likeSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //this defines the object id of the liked Object
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    //this field is use for defining the type of the object since it is a dynamic referencre
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
})

const Like=mongoose.model('Like',likeSchema)
module.exports=Like;
 