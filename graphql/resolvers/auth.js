const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  createUser: async (args) => {
    try {
      //check if user already exists
      const existingUser = await User.findOne({ email: args.userInput.email })
      if (existingUser) {
        throw new Error('User exists already.')
      }
      //if not, hash password
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
      //create new user bases on model
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      })
      //save new user
      const result = await user.save()
      //return new user
      return { ...result._doc, password: null, _id: result.id } //ensures password cannot be returned for security
    } catch (err) {
      throw err
    }
  },
  login: async ({ email, password }) => {
    //does user exist?
    const user = await User.findOne({ email: email })
    if (!user) {
      throw new Error('user does not exist!')
    }
    //does password match?
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      throw new Error('Password is incorrect!')
    }
    //create token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      `${process.env.TOKEN_KEY}`,
      {
        expiresIn: '1h'
      }
    )
    return { userId: user.id, token: token, tokenExpiration: 1 }
  }
}
