const express=require('express')
const app=express();
const port=8000


app.listen(port,function(err){
    if(err){
        //Below both the statement are same 
       // console.log("Error : ",err)
        console.log(`Error in running the server  : ${err}`)
        return
    }

    console.log(`Server is running on port : ${port}`)
})