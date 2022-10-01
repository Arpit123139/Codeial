const express=require('express')
const router=express.Router();
const passport=require('passport')

const post_apiController=require('../../../controllers/api/v1/post_api')

router.get('/',post_apiController.index)
router.delete('/:id',passport.authenticate('jwt',{session:false}),post_apiController.destroy)     //the middle function takes us to passport-jet-startegy in config where the user is identified and return then it goes to destro in controller and jwt token is already created in creare-session users_api.js controller

module.exports=router