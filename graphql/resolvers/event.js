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
    const { title, details, location, date } = args.eventInput
    //check if user is authenticated
    if (!req.isAuth) {
      throw new Error('Cannot create event - unauthorized!')
    }
    const event = new Event({
      title: title,
      details: details,
      location: location,
      date: new Date(date),
      owner: req.userId
    })
    let createdEvent
    try {
      const result = await event.save()
      createdEvent = transformEvent(result)
      const owner = await User.findById(req.userId)
      if (!owner) {
        throw new Error('Cannot create event - user not found!')
      }
      owner.createdEvents.push(event)
      await owner.save()
    } catch (error) {
      throw error
    }
    return createdEvent
  }
}
