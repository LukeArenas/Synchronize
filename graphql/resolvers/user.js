const User = require('../../models/User')

module.exports = {
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
