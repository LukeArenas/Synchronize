const User = require('../../models/User')

module.exports = {
  user: async ({ userId }) => {
    try {
      const user = await User.findById(userId)
      return user
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
