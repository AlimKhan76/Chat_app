const mongoose = require("mongoose")


const uri="mongodb+srv://coder34521:Ru3eOcZc9RMhYCI0@cluster0.pq9euua.mongodb.net/"

const connectToMongo =()=>{
    try{
    mongoose.connect(uri)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connectToMongo;