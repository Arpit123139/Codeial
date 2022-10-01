const express=require('express')
const router=express.Router();

const users_apiController=require('../../../controllers/api/v1/users_api')

router.post('/create-session',users_apiController.createSession)

module.exports=router