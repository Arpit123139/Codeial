// this is a entry point to all the routes index.js (main) will send in a request to routes/index.js then they will be further routed

//express router

const express=require('express')
const router=express.Router();

//Accessing the home Controller
const homeController=require("../controllers/home_controller")

// As we export the home so we are accessing it from home_controller.'js
router.get('/',homeController.home )
router.get('/temp',homeController.temp)
module.exports=router