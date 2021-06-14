import React, { Component } from 'react'
import '../styles/Day.css'

class Day extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.mapBookingsToDate()
  }

  render() {
    return (
      <div className="calendar-days">
        {this.props.days.map((day) => {
          return (
            <div className="day-box">
              <h3>{day.date}</h3>
              {day.events
                ? day.events.map((booking) => {
                    return (
                      <div>
                        {new Date(booking.event.date).toLocaleTimeString()} -{' '}
                        {booking.event.title}
                      </div>
                    )
                  })
                : null}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Day
