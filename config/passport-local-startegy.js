const passport = require('passport')
const User = require('../models/users')

const LocalStartegy = require('passport-local').Strategy

//need to tell the passport library to use the localtartegy
/************************This part is finding the user and authenticating them ********************************************************************/
passport.use(new LocalStartegy({
    usernameField: 'email',      // From Schema
},
    function (email, password, done) {
        //find a user and establish the identity
        User.findOne({ email: email }, function (err, user) {      // The firsm email of email:email is from schema  

            if (err) {
                console.log("Error in finding user--> Passport")
                return done(err)
            }
            if (!user || user.password != password) {

                console.log("Invalid Username/Password")
                return done(null, false)    // there is no error so null and false as authentication is not done this is a inbuilt function that automatically handle all the things

            }

            return done(null, user)    //this will return the user to the serializer

        })


    }
))

//Serializing the user to decide which key is to be kept in the cookie storing the id as the value of the cookie user_id in manual auth
/******************After the user is authenticated then we have to serialize the user it means which key is to be passed to the cookie  */
passport.serializeUser(function (user, done) {
    done(null, user.id);   //automatically encrypt it in the cookie
})

//deserializing the user from the key in the cookies when the browser send back the user_id which is a cookie created in a browser
/*******************When the next request comes in we need to deserialize to find which user is making the request */
//It stores the user id in the session cookie which is encrypted using middleware
passport.deserializeUser(function (id, done) {

    User.findById(id, function (err, user) {
        if (err) {
            console.log("Error in finding user--> Passport")
            return done(err)
        }

        return done(null, user)
    })
})

//check if the user is authenticated

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();        // if the user is sign in ,then pass on the request to the next function which is controllers action mention is users,js folder in routes

    }

    //if the user is not sign in
    return res.redirect('/users/sign-in')
}

// this function is use as a middleware whenever any request is made this comes into play
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {

        //req.user contains the current signed in user from the session Cookie and we are just sending this to the locals for the views

        //response is comming from the server and request is sent from the browser to the server
        res.locals.user = req.user
        //  console.log(req.body)
         console.log(req.user)

    }
    next()
}

module.exports = passport 
