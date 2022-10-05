
const Post = require('../models/post')
const User = require('../models/users')
const Friends=require('../models/friendship')

// telling that the function is of type async it contains sone asynchronus task

module.exports.home = async function (req, res) {

    //return res.end('<h1>Express is up for codeial</h1>')

    //just reading the cookie created on the browser
    //console.log(req.cookies)  //cookie comming in as a request
    //Cookie going back as a response so to change the value we must use res

    //res.cookie('user_id',25) 

    // populating the reffersed user of each post which give the complete user not just the id 


    try {
        let posts = await Post.find({})
        .sort('-createdAt')      // THE post which was created earlier appear at the top and sorting occurs
        .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })

        //sending the list of user and wait for this process to complete as it is await and then move forward
        //this is send to display the list of friends
        let user = await User.find({});
        let findFriend;
        if(req.user){
            let user2=await User.findById(req.user._id)
             findFriend=await Friends.find({
                from_user:req.user._id
            }).populate('to_user')
            
            console.log(findFriend)
        }

        return res.render('home', {

            title: "Home",
            post: posts,
            all_user: user,
            friend:findFriend
        })
    } catch (err) {
        console.log('Error',err)

    }








}

module.exports.temp = function (req, res) {
    return res.end('<h1>Practice is up for codeial</h1>')

}