import React from 'react'
import Day from '../components/Day'

//logic to find current month, year
const today = new Date().toDateString()
const date = new Date().toJSON().toString()
const month = parseInt(date.slice(5, 7))
const year = today.slice(11)

//populating array with date objects
let dateArray = []
for (let i = 1; i < 31; i++) {
  const nextDay = new Date(year, month - 1, i).toString()
  let dayObj = {
    weekday: nextDay.slice(0, 3),
    date: nextDay.slice(8, 10),
    month: month,
    year: year
  }
  dateArray.push(dayObj)
}
console.log(dateArray)
const Calendar = () => {
  return (
    <div>
      {`${today}`}
      <div>calendar here</div>
      {/* {dateArray.map((day) => {
        return (
          <div>
            <Day day={day} />
          </div>
        )
      })} */}
    </div>
  )
}

export default Calendar
