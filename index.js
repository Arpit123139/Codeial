const express=require('express')
const app=express();
const port=8000

/***********************use express router*************/
app.use('/',require("./routes"))          // by doing this we are telling the app that all .get .post will be handle by this folder 

/*****************Telling that we have to use ejs as View Engine */
app.set('view engine','ejs')
app.set('views','./views')
app.listen(port,function(err){
    if(err){
        //Below both the statement are same 
       // console.log("Error : ",err)
        console.log(`Error in running the server  : ${err}`)
        return
    }

    console.log(`Server is running on port : ${port}`)
})