const Event = require('../../models/Event')
const User = require('../../models/User')

//helper function to transform the event mongo returns; stripping the metadata and reformatting certain fields
const transformEvent = (event) => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    owner: user.bind(this, event.creator)
  }
}

module.exports = {
  events: async () => {
    try {
      const events = await Event.find()
      const eventsArray = events.map((event) => {
        transformEvent(event)
      })
      return eventsArray
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
      owner: '1234'
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
