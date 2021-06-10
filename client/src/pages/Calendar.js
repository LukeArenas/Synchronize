import React from 'react'
import Day from '../components/Day'

//logic to find current month, year
const today = new Date().toDateString()
const date = new Date().toJSON().toString()
const month = parseInt(date.slice(5, 7))
const year = today.slice(11)
//populating array with date objects
let dateArray = []
let n
const thirtyDayMonths = [4, 6, 9, 11]
const thirtyOneDayMonths = [1, 3, 5, 7, 8, 10, 12]
if (thirtyDayMonths.indexOf(month)) {
  n = 31
} else if (thirtyOneDayMonths.indexOf(month)) {
  n = 32
} else {
  n = 29
}
for (let i = 1; i < n; i++) {
  const nextDay = new Date(year, month - 1, i).toString()
  let dayObj = {
    weekday: nextDay.slice(0, 3),
    date: nextDay.slice(8, 10),
    month: month,
    year: year
  }
  dateArray.push(dayObj)
}
//BETTER WAY TO DO IT:
//let i
//while continue = true
//all the date logic above
//i++
//if(nextDay.slice(5, 7) !== month)
//continue = false

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
