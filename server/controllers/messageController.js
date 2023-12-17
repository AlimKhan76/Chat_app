const Message = require("../Modals/messagesModel")

//fetches messages
const fetchMessages = async (req, res) => {
    try {
        const { chatId } = req.params
        
        const allMessages= await Message.find({chat: chatId},{content:1, sender:1})
        return res.json(allMessages)
    }

    catch (err) {
        console.log(err)
    }


}

//Send Messages
const sendMessage = async (req, res) => {
    try {
        const { messageData } = req.body
        const { token } = req.headers

        const message = await Message.create({ ...messageData, sender: token })

        if (message) {
            return res.json(message)
        }

    }
    catch (err) {
        console.log(err)
    }

}

module.exports = { fetchMessages, sendMessage }