const express=require('express')
const router=express.Router();
const friendsController=require('../controllers/friends_controller')

router.get('/add/:id',friendsController.friend)


module.exports=router