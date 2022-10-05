//this is going to look into the request from the subscriber this is basically a observer

//recieve the request for connection
module.exports.chatSockets=function(socketServer){
    // let io=require('socket.io')(socketServer)

    // io.sockets.on('connection',function(socket){

    //     console.log("new connection revieve ",socket.id)

    // })
    const io=require('socket.io')(socketServer,{
        cors:{
            origin:"http://localhost:8000",
            methods:['GET','POST']
        }
    })








}