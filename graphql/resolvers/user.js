const User = require('../../models/User')
const Event = require('../../models/Event')

const findEvents = async (userId) => {
  const events = await Event.find({ owner: userId })
  return events
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
