const User=require('../models/users')   // Created a Schema

module.exports.profile=function(req,res){

    return res.render('user_profile',{
        title:'User Profile'


    })
}

// Render the SignUpPage
module.exports.signUp=function(req,res){

    return res.render('user_sign_up',{
        title:"Codeial | SignUp"
    })
}

// Render the signIn page
module.exports.signIn=function(req,res){

    return res.render('user_sign_in',{
        title:"Codeial | SignIn"
    })
}

//get the signup daat


//Handling the even when the sign-up button is clicked 
module.exports.create=function(req,res){

    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back')
    }

    // It will find if there is a user with the same email
    User.findOne({email:req.body.email},function(err,user){

        if(err){
            console.log("error in finding in signing up")
            return
        }

        // if user does not exsist in the database then create once 
        if(!user){
            User.create(req.body,function(err,user){

                if(err){
                    console.log("error in creating user while signing up")
                    return
                }
                return res.redirect('/users/sign-in')        // yeh line aate hi woh index.js(main) file mai jaaega jahan diya gaya hai saare req routes folder mai index.js handle karega ab index.js mai likha hai ki /users karke koi bhi request hogi toh users.js handle karega ab wahan se users_controller folder pe gaya jahan action define hai 

            })
        }
        else{
            return res.redirect('back')
        }
    })

}

//signIn and create a session for the user Action when signIn button is clicked
module.exports.createSession=function(req,res){

    return res.redirect('/')
}