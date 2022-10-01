const express=require('express')
const router=express.Router();

const user_listController=require('../../../controllers/api/v2/user_list')
router.get('/',user_listController.index)

module.exports=router