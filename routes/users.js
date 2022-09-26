const express=require('express')
const router=express.Router()

const usersController=require("../controllers/users_controller")

router.get("/profile",usersController.profile)           //this works when the url is /users/profile


module.exports=router