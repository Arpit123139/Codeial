const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./config/mongoose')
const app = express();
const port = 8000

// used for session cookie and authentication
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-startegy');             // this is require for express-session np need of logics
const passportjwt = require('./config/passport-jwt-strategy');        // this is require for express-session np need of logics
const passportGoogle=require('./config/passport-google-oauth2-startegy')


const { options } = require('./routes');

//for storing the session key in mongo
const MongoStore = require('connect-mongo');
 // seesion is the express-session declared at line 8 

 //SAAS Middleware Its use is to convert the SAAS into normal css when the server starts 
 const saasMiddleware=require('node-sass-middleware')

 //Setting up the flash
 const flash=require('connect-flash')
 const customMware=require('./config/middleware')

 //socket.io  Set up the chat Server to be used with socket.io
 const chatServer=require('https').createServer(app)
 const ChatSockets=require('./config/chat_socket').chatSockets(chatServer)        // we must pass chatServer to it 
 chatServer.listen(5000)
 console.log("Chat server is listening on port 5000")

 // below the server start becuase we need a precompile version to css
 app.use(saasMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,       // need to display the error
    outputStyle:'extended',   // whether we rewuire in multiple line or single line
    prefix:'/css'                   // where should the server look out for css file

 }))



/******************Reading through the post request** */
app.use(express.urlencoded())
/*******************Cookie-Parser******** */
app.use(cookieParser())
/*****************************Middle Ware for Static Files  */
app.use(express.static('assets'))
// for the image
app.use('/uploads',express.static(__dirname+'/uploads'))



/*****************Telling that we have to use ejs as View Engine */
app.set('view engine', 'ejs')
app.set('views', './views')

/****************************Middleware which takes in the session cookie and encrypt it */
app.use(session({

    name: "codeial",
    //TODO change the secret before deployment
    //whenever encryption happen there is a key to encode and decode it so to decode it we define the key
    secret: 'blahsomething',
    saveUninitialized: false,    // when the identity is not established or the user has not sign_In then we dont need extra data in the session cookie
    resave: false,               // if it data is already there in the session cokoie then we dont need to save again and again
    cookie: {
        maxAge: (1000 * 60 * 100)      // calculated in millisecond
    },// storing the session key in mongo
    store: MongoStore.create({
        mongoUrl:'mongodb://localhost/codeial_development'
    })
}))
// need to tell to use passport  
app.use(passport.initialize())
app.use(passport.session())

//pass the user data to the locals so that it can be access by the views
app.use(passport.setAuthenticatedUser)

//using Flash  we need to put it after the session has been used because it uses session-cookie
app.use(flash())
app.use(customMware.setFlash)
/***********************use express router*************/
app.use('/', require("./routes"))          // by doing this we are telling the app that all .get .post will be handle by this folder 


app.listen(port, function (err) {
    if (err) {
        //Below both the statement are same 
        // console.log("Error : ",err)
        console.log(`Error in running the server  : ${err}`)
        return
    }

    console.log(`Server is running on port : ${port}`)
})