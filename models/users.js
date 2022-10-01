const mongoose=require('mongoose')
const multer=require('multer');
const path=require('path')
const AVATAR_PATH=path.join('/uploads/users/avatars')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String

    }
},{
    timestamps:true
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //this is where the avatar get stored
      cb(null, path.join(__dirname,'..',AVATAR_PATH))     // __dirname gives the user.js the corrent directory
    },
    filename: function (req, file, cb) {
     // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

//static function
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar')     // It assigns the diskStorage on multer in the storage property 
userSchema.statics.avatarPath=AVATAR_PATH


const User=mongoose.model('User',userSchema)

module.exports=User;