
const Post = require('../models/post')
const User = require('../models/users')

// telling that the function is of type async it contains sone asynchronus task

module.exports.home = async function (req, res) {

    //return res.end('<h1>Express is up for codeial</h1>')

    //just reading the cookie created on the browser
    //console.log(req.cookies)  //cookie comming in as a request
    //Cookie going back as a response so to change the value we must use res

    //res.cookie('user_id',25) 

    // populating the reffersed user of each post which give the complete user not just the id 


    try {
        let posts = await Post.find({}).populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })

        //sending the list of user and wait for this process to complete as it is await and then move forward
        let user = await User.find({});

        return res.render('home', {

            title: "Home",
            post: posts,
            all_user: user
        })
    } catch (err) {
        console.log('Error',err)

    }








}

module.exports.temp = function (req, res) {
    return res.end('<h1>Practice is up for codeial</h1>')

}