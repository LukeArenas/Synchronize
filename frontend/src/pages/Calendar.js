import React, { Component } from 'react'
import Day from '../components/Day'
import '../styles/Calendar.css'

//logic to find current month, year
const today = new Date().toDateString()
const date = new Date().toJSON().toString()
const month = parseInt(date.slice(5, 7))
const year = today.slice(11)
//populating array with date objects
let dateArray = []
const placeholderDay = {
  weekday: '',
  date: '',
  month: '',
  year: '',
  formattedDate: '',
  events: null
}
//populating empty days as placeholders for correct weekday placement
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const firstWeekday = new Date(year, month - 1, 1).toString().slice(0, 3)
let j = weekdays.indexOf(firstWeekday)
while (j > 0) {
  dateArray.push(placeholderDay)
  j--
}
//populating with days in month
let i = 1
let isContinued = true
while (isContinued) {
  const nextDay = new Date(year, month - 1, i).toString()
  const nextDayJSON = new Date(year, month - 1, i).toJSON()
  let dayObj = {
    weekday: nextDay.slice(0, 3),
    date: nextDay.slice(8, 10),
    month: month,
    year: year,
    formattedDate: `${month}/${nextDay.slice(8, 10)}/${year}`,
    events: []
  }
  if (parseInt(nextDayJSON.slice(5, 7)) !== month) {
    isContinued = false
  } else {
    dateArray.push(dayObj)
    i++
  }
}
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

class Calendar extends Component {
  state = {
    isCreating: false,
    dateArray: dateArray
  }

  componentDidMount() {
    this.mapBookingsToDate()
  }

  handleClick = () => {
    this.setState({ isCreating: true })
  }

  handleCancel = () => {
    this.setState({ isCreating: false })
  }

  mapBookingsToDate = () => {
    this.props.bookings.map((booking) => {
      this.state.dateArray.map((date) => {
        let formattedBookingDate = new Date(
          booking.event.date
        ).toLocaleDateString()
        if (`${date.formattedDate}` === `${formattedBookingDate}`) {
          if (
            date.events.length === 0 ||
            date.events.findIndex(function (element) {
              return element.event._id === booking.event._id
            }) === -1
          ) {
            date.events.push(booking)
          }
        }
      })
    })
  }

  render() {
    return (
      <div className="calendar">
        <div className="month">
          <h1>{months[new Date().getMonth()]}</h1>
        </div>
        <div className="weekdays">
          <div className="weekday">
            <h2>Sunday</h2>
          </div>
          <div className="weekday">
            <h2>Monday</h2>
          </div>
          <div className="weekday">
            <h2>Tuesday</h2>
          </div>
          <div className="weekday">
            <h2>Wednesday</h2>
          </div>
          <div className="weekday">
            <h2>Thursday</h2>
          </div>
          <div className="weekday">
            <h2>Friday</h2>
          </div>
          <div className="weekday">
            <h2>Saturday</h2>
          </div>
        </div>
        <div>
          <Day
            days={this.state.dateArray}
            mapBookingsToDate={this.mapBookingsToDate}
          />
        </div>
      </div>
    )
  }
}

export default Calendar
