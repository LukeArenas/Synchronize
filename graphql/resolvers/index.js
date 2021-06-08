const eventResolver = require('./event')
const userResolver = require('./user')

const combinedResolver = {
  ...eventResolver,
  ...userResolver
}

module.exports = combinedResolver
