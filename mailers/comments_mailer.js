const nodeMailer=require('../config/nodemailer')

//arrow function
exports.newComment=(comment)=>{

    console.log("inside newComment Mailer")

    console.log(comment.user.email)
    nodeMailer.transporter.sendMail({

        from:'arpitgajya2001@gmail.com',
        to:comment.user.email,
        subject:'New Comment Published',
        html:'<h1>Your Comment has been Published</h1>'
    },(err,info)=>{
        if(err){
            console.log("Error in sending mail ",err)
            return;
        }
        
        console.log('Message Sent ',info)
        return;
    })
}