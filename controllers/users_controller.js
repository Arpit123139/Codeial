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