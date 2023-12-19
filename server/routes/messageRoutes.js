const express = require("express");
const { fetchMessages, sendMessage } = require("../controllers/messageController");
const router = express.Router();

router.get("/fetch/:chatId", fetchMessages)
router.post("/send", sendMessage)

module.exports = router