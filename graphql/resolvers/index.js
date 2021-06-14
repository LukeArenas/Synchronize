const authResolver = require('./auth')
const eventResolver = require('./event')
const bookingResolver = require('./booking')

const rootResolver = {
  ...authResolver,
  ...eventResolver,
  ...bookingResolver
} //combines all resolvers into one to use in app.js

module.exports = rootResolver
