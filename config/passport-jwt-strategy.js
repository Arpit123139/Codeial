const passport=require('passport')
const jwtStartegy=require('passport-jwt').Strategy

// it willhelp to extract token from the header
const ExtractJWT=require('passport-jwt').ExtractJwt
const User=require('../models/users')


let opts={   //opts  is an object literal containing options to control how the token is extracted from the request or verified.
    
    //header has the list of keys it has a key called Autherization which further has the list of keys  so that has the key beared which has the jwt token
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),       //It accepts a request as the only parameter and returns either the JWT as a string or null
    secretOrKey:'codeial'
}

// the comments are in passport-loocal-startegy.js
passport.use(new jwtStartegy(opts,function(jwtPayload,done){

    //in the local-startegy we are first cheking the name/id and the password and then storing the user in the cookie
    //here the user is already present in the jwt we are just authenticating 

    User.findById(jwtPayload._id,function(err,user){

        if(err){
            console,log("Error in finding user from jwt")
            return;
        }
        if(user){
            return done(null,user)
        }else{
            return done(null,false)          // user is not found
        }
    })
}))

module.exports=passport

