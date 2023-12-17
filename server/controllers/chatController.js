const Chat = require("../Modals/chatModel");
const User = require("../Modals/userModel");

const searchUser = async (req, res) => {
    try {
        const { email } = req.params
        const { token } = req.headers

        const user = await User.find({
            email: { $regex: `^${email}` }, _id: { $ne: token }
        })

        if (user) {

            return res.json({
                user
            })
        }
        else {
            return res.statusCode(404).json({
                message: "No User Found"
            })
        }

    }
    catch (err) {
        return res.send(err)
    }
}



const fetchChat = async (req, res) => {
    try {
        const { receiverId } = req.params
        const { token } = req.headers
        const chat = await Chat.find({ users: { $all: [receiverId, token] } })

        if (chat.length != 0) {
            return res.json(chat)
        }
        else {
            const chatName = await User.findOne({ _id: receiverId })
            const createdChat = await Chat.create({ username: chatName.email, users: [receiverId, token] })
            return res.json(createdChat)
        }

    }
    catch (err) {
        console.log(err)
    }

}


const createChat = () => {
    try {
    }
    catch (err) {
        console.log(err)
    }

}







module.exports = { searchUser, fetchChat }