import React, { useState } from 'react'
import Day from '../components/Day'
import CreateModal from '../components/CreateModal'
import Backdrop from '../components/Backdrop'
import { useHistory } from 'react-router-dom'
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
  year: ''
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
    year: year
  }
  if (parseInt(nextDayJSON.slice(5, 7)) !== month) {
    isContinued = false
  } else {
    dateArray.push(dayObj)
    i++
  }
}

const Calendar = () => {
  const history = useHistory()
  const handleClick = () => {
    console.log('clicked')
    setCreating(true)
    console.log(isCreating)
  }

  const [isCreating, setCreating] = useState(false)

  return (
    <div className="calendar">
      {isCreating ? (
        <div>
          <Backdrop />
          <CreateModal />
        </div>
      ) : (
        <button className="create-button" onClick={() => handleClick()}>
          +Create Event
        </button>
      )}

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
      <div className="calendar-days">
        {dateArray.map((day) => {
          return (
            <div>
              <Day day={day} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
