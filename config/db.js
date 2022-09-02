const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true
        })
        console.log("mongoose Connected...")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB