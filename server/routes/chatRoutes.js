const express= require("express")
const { searchUser, fetchChat, searchExistingChats, retrieveChats } = require("../controllers/chatController")
const router= express.Router()


router.get("/search/:email",searchUser)
router.get("/:receiverId",fetchChat)
router.get("/chat/:id",searchExistingChats)
router.get("/:chatId",retrieveChats)


module.exports=router