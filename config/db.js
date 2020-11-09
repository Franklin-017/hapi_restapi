const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
            console.log(`MongoDB connected: ${mongoose.connection.host}`)
        })
    } catch (err) {
        console.log(err)
    }
}
module.exports = connectDB