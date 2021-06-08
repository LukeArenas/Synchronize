const Event = require('../../models/Event')
const User = require('../../models/User')

//helper function to transform the event mongo returns; stripping the metadata, reformatting fields
const transformEvent = (event) => {
  return {
    ...event._doc,
    date: new Date(event._doc.date).toISOString()
  }
}

module.exports = {
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
