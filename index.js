const express=require('express')
const cookieParser=require('cookie-parser')
const db =require('./config/mongoose') 
const app=express();
const port=8000



/******************Reading through the post request** */
app.use(express.urlencoded())
/*******************Cookie-Parser******** */
app.use(cookieParser())

/***********************use express router*************/
app.use('/',require("./routes"))          // by doing this we are telling the app that all .get .post will be handle by this folder 



/*****************Telling that we have to use ejs as View Engine */
app.set('view engine','ejs')
app.set('views','./views')

/*****************************Middle Ware for Static Files  */
app.use(express.static('assets'))


app.listen(port,function(err){
    if(err){
        //Below both the statement are same 
       // console.log("Error : ",err)
        console.log(`Error in running the server  : ${err}`)
        return
    }

    console.log(`Server is running on port : ${port}`)
})