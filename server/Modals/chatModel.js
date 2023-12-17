const mongoose = require("mongoose")

const chatModal = mongoose.Schema({
    username: { type: String, default:"Private User" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
},
    { timestamps: true }
)

const Chat = mongoose.model("Chat", chatModal)

module.exports = Chat