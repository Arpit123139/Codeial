//front -end of socket.io
//these are communication from the client side they are subscriber

//always user start the connection

console.log("*************************")
class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`)
        this.userEmail=userEmail

        //Initiate the connectiom
        this.socket = io.connect('https://localhost:5000')
        
        if(this.userEmail){
            this.connectionHandler
        }




    }

    connectionHandler(){

        this.socket.on('connect',function(){
            try {
                console,log("Connection Established Using Sockets.....")

            } catch (err) {
                console.log("error ",err)
            }
        })
    }
}