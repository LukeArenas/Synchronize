import React from 'react'
import Day from '../components/Day'

const Calendar = () => {
  const daysArray = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div>
      <div>calendar here</div>
      {daysArray.map((day) => {
        return (
          <div>
            <Day day={day} />
          </div>
        )
      })}
    </div>
  )
}

export default Calendar
