const mongoose = require('mongoose')
require('dotenv').config()
let dbUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@event-booking.yxaxj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
mongoose
  .connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log('Successfully connected to MongoDB.')
  })
  .catch((e) => {
    console.error('Connection error', e.message)
  })
mongoose.set('debug', true)
const db = mongoose.connection

module.exports = db
