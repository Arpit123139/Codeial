
const Post=require('../models/post')
const User=require('../models/users')

module.exports.home=function(req,res){
    //return res.end('<h1>Express is up for codeial</h1>')

    //just reading the cookie created on the browser
     console.log(req.cookies)  //cookie comming in as a request
     //Cookie going back as a response so to change the value we must use res

     res.cookie('user_id',25)

     Post.find({},function(err,posts){

        

        return res.render('home',{

            title:"Home",
            post:posts
        })
     })
    
}

module.exports.temp=function(req,res){
    return res.end('<h1>Practice is up for codeial</h1>')

}