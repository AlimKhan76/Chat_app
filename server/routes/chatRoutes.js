const express= require("express")
const { searchUser, fetchChat } = require("../controllers/chatController")
const router= express.Router()


router.get("/search/:email",searchUser)
router.get("/:receiverId",fetchChat)


module.exports=router