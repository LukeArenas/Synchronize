const User = require('../../models/User')
const Event = require('../../models/Event')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//helper function to bind events to user query
const findEvents = async (userId) => {
  const events = await Event.find({ owner: userId })
  const eventsArray = events.map((event) => {
    return transformEvent(event)
  })
  return eventsArray
}

const transformEvent = (event) => {
  return {
    ...event._doc,
    date: new Date(event._doc.date).toISOString()
  }
}

module.exports = {
  user: async ({ userId }) => {
    try {
      const user = await User.findById(userId)
      return {
        ...user._doc,
        createdEvents: findEvents.bind(this, user._doc._id)
      }
    } catch (error) {
      throw error
    }
  },
  register: async (args) => {
    try {
      const newUser = new User({
        username: args.userInput.username,
        password: args.userInput.password
      })
      const result = await newUser.save()
      const transformedResult = { ...result._doc, password: null }
      return transformedResult
    } catch (error) {
      throw error
    }
  }
}
