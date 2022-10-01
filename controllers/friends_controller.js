const User = require('../models/users')
const Friendship=require('../models/friendship')


module.exports.friend=async function(req,res){

    try {
        let friend=await Friendship.findOne({
            from_user:req.user._id,
            to_user:req.params.id
        })
    
        
        if(friend){
            console.log("******************************************Already a friend")
        }else{
            let createFriends1=await Friendship.create({
                from_user:req.user._id,
                to_user:req.params.id
            })
            let createFriends2=await Friendship.create({
                to_user:req.user._id,
                from_user:req.params.id
            })
           
    
            let user1=await User.findById(req.user._id)
           
            user1.friendships.push(createFriends1)
            user1.update()
            user1.save()
           
            let user2=await User.findById(req.params.id)
           
            user2.friendships.push(createFriends2)
            user2.update()
            user2.save()
          
    
        }
        return res.redirect('back')
        
    } catch (err) {
        console.log("error in adding friend ",err)
        return;
    }


}

