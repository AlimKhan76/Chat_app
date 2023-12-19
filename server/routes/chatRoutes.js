const express = require("express")
const { searchUser, loadChat, searchExistingChats, retrieveChatMessages } = require("../controllers/chatController")
const router = express.Router()

router.get("/search/:email", searchUser)
router.get("/load/:receiverId", loadChat)
router.get("/user/:id", searchExistingChats)
router.get("/:chatId", retrieveChatMessages)


module.exports = router