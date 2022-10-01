const Comment=require('../../../models/comment')
const User=require('../../../models/users')

module.exports.index=async function(req,res){

    let user=await User.find({})

    return res.json(200,{
        message:"list of user",
        user:user
    })

}
