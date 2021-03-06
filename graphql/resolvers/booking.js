const Booking = require('../../models/booking')
const Event = require('../../models/event')
const { transformBooking, transformEvent } = require('./merge')

//helper function to help with code reusability - formats raw data stored in database

module.exports = {
  bookings: async (args, req) => {
    //check authentication using request
    if (!req.isAuth) {
      throw new Error('Unauthenticated.')
    }
    try {
      const bookings = await Booking.find({
        user: { _id: args.userId }
      })
      return bookings.map((booking) => {
        return transformBooking(booking)
      })
    } catch (err) {
      throw err
    }
  },
  bookEvent: async (args, req) => {
    //check authentication using request
    if (!req.isAuth) {
      throw new Error('Unauthenticated.')
    }

    const fetchedEvent = await Event.findOne({ _id: args.eventId })
    const booking = new Booking({
      user: req.userId,
      event: fetchedEvent
    })
    const result = await booking.save()
    return transformBooking(result)
  },
  cancelBooking: async (args, req) => {
    //check authentication using request
    if (!req.isAuth) {
      throw new Error('Unauthenticated.')
    }
    try {
      //find booking
      const booking = await Booking.findById(args.bookingId).populate('event')
      //find event
      const event = transformEvent(booking.event)
      //delete booking
      await Booking.deleteOne({ _id: args.bookingId })
      //return event of deleted booking?
      return event
    } catch (err) {
      throw err
    }
  }
}
