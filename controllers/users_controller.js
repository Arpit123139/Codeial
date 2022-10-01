const User = require('../models/users');
const fs=require('fs')
const path=require('path')


module.exports.profile = function (req, res) {

    
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
        })

    })
   
}


// render the sign up page
module.exports.signUp = function (req, res) {

    if (req.isAuthenticated()) {
       
        return res.redirect('/users/profile')

    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')

    }

    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user while signing up'); return }

                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function (req, res) {

    req.flash('Success','Logged in Successfully')
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {

    req.logout(function (err) {
        if (err) {
            console.log("error in signing out")
            return;
        }
       return res.redirect('/');
    });
    req.flash('Success','You have Logged Out')
    // as we are posting the flash in req but we are returning the res

    // to set the flash message from the req to res we are making middleware
    res.redirect('/')         
}

module.exports.update=async function(req,res){

    
    //this is an authentication check so the user can update his own profile only
    // if(req.user.id==req.params.id)
    // {
        
    //     User.findByIdAndUpdate(req.params.id,{
    //         name:req.body.name,
    //         email:req.body.email
    //     },function(err,user){
    //         return res.redirect('back')
    //     })
    // }else{
    //     return res.status(401).send('Unauthorized')
    // }
    if(req.user.id==req.params.id)
    {
        try {
            let user=await User.findById(req.params.id)
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log("******multer Error:",err)
                }
                else{
                    console.log(req.file)

                    //the req.body is not available withouth multer because form is of enctype=multifile
                    user.name=req.body.name
                    user.email=req.body.email

                    if(req.file){

                        //deleting a file if the user has already associated with a avatar if the user has a associated avatar already then we delte it and update a new One
                        if(user.avatar){
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar))

                        }
                        //this is  saving the path of the uploaded file into the avatar field in the user
                        user.avatar=User.avatarPath+'/'+req.file.filename
                    }
                    user.save();
                    return res.redirect('back')
                }
            })
            
        } catch (err) {
            console.log('error',err)
        }

    }else{
        return res.status(401).send('Unauthorized')
    }



}