import React, { Component } from 'react'
import AuthContext from '../context/auth-context'
import Spinner from '../components/Spinner'
import Calendar from '../pages/Calendar'
import { BASE_URL } from '../globals'

class Booking extends Component {
  state = {
    isLoading: false,
    bookings: []
  }

  static contextType = AuthContext

  componentDidMount() {
    this.fetchBookings()
  }

  fetchBookings() {
    this.setState({ isLoading: true })
    const requestBody = {
      query: `
          query {
            bookings {
              _id
              createdAt
              event {
                _id
                title
                date
              }
            }
          }
        `
    }

    fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!')
        }
        return res.json()
      })
      .then((resData) => {
        const bookings = resData.data.bookings
        console.log(bookings)
        this.setState({ bookings: bookings, isLoading: false })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ isLoading: false })
      })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <Calendar bookings={this.state.bookings} />
        )}
      </React.Fragment>
    )
  }
}

export default Booking
