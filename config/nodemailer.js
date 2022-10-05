const nodemailer=require('nodemailer')
const ejs=require('ejs')
const path=require('path')

let transporter=nodemailer.createTransport({
    
     service:'gmail',
     host:'smtp.gmail.com',
     port:587,
     secure:false,
     auth:{
        
        user:'arpitgajya2001@gmail.com',
        pass:'Jeemain_123'
     }
})


//we define that we will be using ejs

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        // the path specify where the .ejs files are placed
        path.join(__dirname,'../views/mailers',relativePath),           // releative path define the path from where the function call takes place 
        data,
        function(err,template){
            if(err){
                console.log("Error in rendering Template ",err)
                return;
            }
            mailHTML=template

        }
    )
    return mailHTML

}
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}