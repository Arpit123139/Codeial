const express=require('express')
const router=express.Router();
const passport=require('passport')

const post_apiController=require('../../../controllers/api/v1/post_api')

router.get('/',post_apiController.index)
router.delete('/:id',passport.authenticate('jwt',{session:false}),post_apiController.destroy)

module.exports=router