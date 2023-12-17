const express= require("express");
const connectToMongo = require("./db");
const app = express()
const userRoutes =require("./routes/userRoutes")
const chatRoutes =require("./routes/chatRoutes")
const messageRoutes =require("./routes/messageRoutes")

const cors = require("cors")
const port = 3001

connectToMongo();

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api",userRoutes);
app.use("/api",chatRoutes)
app.use("/api",messageRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})