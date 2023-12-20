const Message = require("../Models/messagesModel")

// Fetches the messages using chatId
const fetchMessages = async (req, res) => {
    try {
        const { chatId } = req.params
        const allMessages = await Message.find({ chat: chatId }, { content: 1, sender: 1, createdAt: 1 })
        return res.json(allMessages)
    }

    catch (err) {
        console.log(err)
    }


}

// Save the Message 
const sendMessage = async (req, res) => {
    try {
        const { messageData } = req.body
        const { token, chat } = req.headers
        const message = await Message.create({ ...messageData, chat, sender: token })
        if (message) {
            return res.json(message)
        }

    }
    catch (err) {
        console.log(err)
    }

}

module.exports = { fetchMessages, sendMessage }