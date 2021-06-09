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
      //find user by id
      const user = await User.findById(userId)
      //format data to return user plus events associated to them
      return {
        ...user._doc,
        password: null,
        createdEvents: findEvents.bind(this, user._doc._id)
      }
    } catch (error) {
      throw error
    }
  },
  register: async (args) => {
    try {
      const { username, password } = args.userInput
      //check if user already exists
      const existingUser = await User.findOne({ username: username })
      if (existingUser) {
        throw new Error('User already exists!')
      }
      //if not, hash password
      const hashedPassword = await bcrypt.hash(password, 12)
      //create new user
      const newUser = new User({
        username: username,
        password: hashedPassword
      })
      //save new user
      const result = await newUser.save()
      //return new user except password
      return { ...result._doc, password: null }
    } catch (error) {
      throw error
    }
  },
  login: async ({ username, password }) => {
    try {
      //does user exist?
      const existingUser = await User.findOne({ username: username })
      if (!existingUser) {
        throw new Error('User does not exist!')
      }
      //does password match?
      const isPassword = await bcrypt.compare(password, existingUser.password)
      if (!isPassword) {
        throw new Error('Password incorrect!')
      }
      //create token
      const token = jwt.sign(
        {
          userId: existingUser.id,
          username: existingUser.username
        },
        process.env.TOKEN_KEY
      )
      //return necessary user info and token
      return { userId: existingUser.id, token: token }
    } catch (error) {
      throw error
    }
  }
}
