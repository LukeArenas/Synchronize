import React from 'react'
import '../styles/Day.css'

const Day = (props) => {
  return (
    <div className="day-box">
      <h3>{props.day.date}</h3>
    </div>
  )
}

export default Day
