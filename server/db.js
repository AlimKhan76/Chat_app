const mongoose = require("mongoose")

const connectToMongo = () => {
    try {
        mongoose.connect(process.env.MONGO_DB_URI)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectToMongo;