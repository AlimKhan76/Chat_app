const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");
const Message = require("../Models/messagesModel")

// Search the email given by the user
const searchUser = async (req, res) => {
    try {
        const { email } = req.params
        const { token } = req.headers

        const user = await User.find(
            {
                email: { $regex: `^${email}` },
                _id: { $ne: token }
            })

        if (user) {
            return res.json({ user })
        }
        else {
            return res.statusCode(404).json({
                message: "No User Found"
            })
        }

    }
    catch (err) {
        return console.log(err)
    }
}


// Loads chat if it already exists else create a new chat 
const loadChat = async (req, res) => {
    try {
        const { receiverId } = req.params
        const { token } = req.headers
        const chat = await Chat.find({ users: { $all: [receiverId, token] } })

        if (chat.length != 0) {
            return res.json(chat)
        }
        // const chats = await Chat.find({ _id: receiverId })
        // if (chats.length != 0) {
        //     const messages = await Message.find({ chat: receiverId })
        //     // return res.json({chats,messages})
        //     return res.json(chats)
        // }
        else {
            const chatName = await User.find({ _id: receiverId })
            const email = chatName.map((data) => {
                return data.email
            })
            const createdChat = await Chat.create({ username: email[0], users: [receiverId, token] })
            return res.json(createdChat)
        }

    }
    catch (err) {
        console.log(err)
    }
}


// Retrieve the messages from the chats using chatId
const retrieveChatMessages = async (req, res) => {
    try {
        const { chatId } = req.params
        const chats = await Chat.find({ _id: chatId })
        return res.json(chats)
    }
    catch (err) {
        console.log(err)
    }
}


// Loads existing chats the user has made
const searchExistingChats = async (req, res) => {
    try {
        const { id } = req.params
        const username = await User.find({ _id: id }, { email: 1, _id: 0 })
        const email = username.map((data) => {
            return data.email
        })
        const existingChats = await Chat.find({ users: id, username: { $ne: email[0] } })
        return res.json(existingChats)

    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { searchUser, loadChat, searchExistingChats, retrieveChatMessages }