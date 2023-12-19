const express = require("express");
const cors = require("cors")
const app = express()
require('dotenv').config()

const connectToMongo = require("./db");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")


app.use(cors());
app.use(express.json())


connectToMongo();
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})

// -----------------------------Socket.io Code----------------------------------------

// const io = require("socket.io")(server, {
//   pingTimeOut: 60000,
//   cors: {
//     origin: "https://chat-app-ark2.vercel.app",
//     methods: ["GET", "POST"]
//   }
// })

//  //const users = []
// io.on("connection", (socket) => {
//   socket.on("setup", (localId) => {
//     // users[users.length + 1] = localId;

//     socket.join(localId)
//   })
//   // socket.emit("Online", users)


//   socket.on("join chat", (chatId) => {
//     socket.join(chatId)
//   })

//   socket.on("new message", (newMessageReceived) => {
//     let chat = newMessageReceived.chat
//     socket.to(chat).emit("message received", newMessageReceived)
//   })

// })


// -----------------------------Socket.io Code----------------------------------------