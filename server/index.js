const express = require("express");
const connectToMongo = require("./db");
const app = express()
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const cors = require("cors")
const server = require('http').createServer(app);


const port = 3001

connectToMongo();

app.use(cors());
app.use(express.json())

app.use("/api", userRoutes);
app.use("/api", chatRoutes)
app.use("/api", messageRoutes)

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// const server = app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


const io = require("socket.io")(server, {
  pingTimeOut: 60000,
  cors: {
    origin: "*"
  }
})

// const users = []
io.on("connection", (socket) => {
  socket.on("setup", (localId) => {
    // arr.splice(0, 0, localId)
    // users[users.length + 1] = localId;

    socket.join(localId)
    // socket.emit("Online", {localId})
  })
  // socket.emit("Online", users)


  socket.on("join chat", (chatId) => {
    socket.join(chatId)
  })

  socket.on("new message", (newMessageReceived) => {
    let chat = newMessageReceived.chat
    console.log(newMessageReceived)

    socket.to(chat).emit("message received", newMessageReceived)

  })

  // socket.on("disconnecting", (reason) => {
    
  //   delete users[socket.id]; // remove the user. -- maybe not the exact code
  // });



})