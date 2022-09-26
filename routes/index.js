// this is a entry point to all the routes index.js (main) will send in a request to routes/index.js then they will be further routed

//express router

const express=require('express')
const router=express.Router();

//Accessing the home Controller
const homeController=require("../controllers/home_controller")

// As we export the home so we are accessing it from home_controller.'js
router.get('/',homeController.home )
router.get('/temp',homeController.temp)

/**************************This line says that when the request come something like /users then send it to the neighbour users.js  We have to do this because index.js(main) refers to this file so this file must have a list of all other route */
router.use('/users',require("./users"))
module.exports=router