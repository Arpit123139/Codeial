const User=require('../../../models/users')
const jwt=require('jsonwebtoken')

// creating a jwt token 
module.exports.createSession=async function(req,res){

    try {
        let user=await User.findOne({email:req.body.email})

        if(!user || user.password!=req.body.password)
        {
            return res.json(422,{
                message:"Invalid Username or Password"
            })
        }

        
        //Creating the jwt token......................
        return res.json(200,{
            message:"Sign In successfull here is ypur token plz keep it safe",
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'10000000'})
            }
        })

        

        

        
    } catch (err) {
        console.log('***********',err)
        return res.json(500,{
            message:"Internal Server Error"
        })
        
    }
}