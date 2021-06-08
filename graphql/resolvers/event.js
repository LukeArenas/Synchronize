const Event = require('../../models/Event')
const User = require('../../models/User')

//helper functions to transform the event mongo returns; stripping the metadata, reformatting fields, and attaching the user associated
const findUser = async (userId) => {
  try {
    const user = await User.findById(userId)
    return {
      ...user._doc
    }
  } catch (err) {
    throw err
  }
}
const transformEvent = (event) => {
  return {
    ...event._doc,
    date: new Date(event._doc.date).toISOString(),
    owner: findUser.bind(this, event.owner)
  }
}

module.exports = {
  events: async () => {
    try {
      const events = await Event.find()
      // const eventsArray = events.map((event) => {
      //   transformEvent(event)
      // })
      return events
    } catch (error) {
      throw error
    }
  },
  createEvent: async (args, req) => {
    const event = new Event({
      title: args.eventInput.title,
      details: args.eventInput.details,
      location: args.eventInput.location,
      date: args.eventInput.date,
      owner: '60bfd56fd0868909fd6080c8'
    })
    try {
      const result = await event.save()
      const createdEvent = transformEvent(result)
      return createdEvent
    } catch (error) {
      throw error
    }
  }
}
