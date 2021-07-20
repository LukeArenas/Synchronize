import React, { Component } from 'react'
import '../styles/Events.css'
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop'
import AuthContext from '../context/auth-context'
import EventList from '../components/Events/EventList'
import Spinner from '../components/Spinner'
import { BASE_URL } from '../globals'

class EventsPage extends Component {
  state = {
    isCreating: false,
    events: [],
    isLoading: false,
    selectedEvent: null,
    currentMonth: null,
    currentMonthNum: null
  }
  isActive = true

  static contextType = AuthContext

  constructor(props) {
    super(props)
    this.titleElRef = React.createRef()
    this.priceElRef = React.createRef()
    this.dateElRef = React.createRef()
    this.descriptionElRef = React.createRef()
  }

  componentDidMount() {
    this.fetchEvents()
    this.fetchDate()
  }

  startCreateEventHandler = () => {
    this.setState({ isCreating: true })
  }

  modalConfirmHandler = () => {
    this.setState({ isCreating: false })
    const title = this.titleElRef.current.value
    const price = +this.priceElRef.current.value
    const date = this.dateElRef.current.value
    const description = this.descriptionElRef.current.value

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return
    }
    //CREATE EVENT
    const requestBody = {
      query: `
          mutation {
            createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
              _id
              title
              description
              date
              price
              creator {
                _id
                email
              }
            }
          }
        `
    }

    const token = this.context.token

    fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!')
        }
        return res.json()
      })
      .then((resData) => {
        this.setState({
          events: [...this.state.events, resData.data.createEvent]
        })
      })
      .catch((err) => {
        console.log(err)
      }) //could use axios instead
  }

  modalCancelHandler = () => {
    this.setState({ isCreating: false, selectedEvent: null })
  }

  fetchEvents() {
    this.setState({ isLoading: true })
    const requestBody = {
      query: `
          query {
            events {
              _id
              title
              description
              date
              price
              creator {
                _id
                email
              }
            }
          }
        `
    }

    fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!')
        }
        return res.json()
      })
      .then((resData) => {
        const events = resData.data.events
        if (this.isActive) {
          this.setState({ events: events, isLoading: false })
        }
      })
      .catch((err) => {
        console.log(err)
        if (this.isActive) {
          this.setState({ isLoading: false })
        }
      })
  }

  fetchDate = () => {
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
    const monthNumber = new Date().getMonth()
    const monthName = months[monthNumber]
    this.setState({ currentMonth: monthName, currentMonthNum: monthNumber })
  }

  showDetailHandler = (eventId) => {
    this.setState((prevState) => {
      const selectedEvent = prevState.events.find((e) => e._id === eventId)
      return { selectedEvent: selectedEvent }
    })
  }

  bookEventHandler = () => {
    if (!this.context.token) {
      this.setState({ selectedEvent: null })
      return
    }
    const requestBody = {
      query: `
          mutation {
            bookEvent(eventId: "${this.state.selectedEvent._id}") {
              _id
              createdAt
              updatedAt
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
        console.log(resData)
        this.setState({ selectedEvent: null })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentWillUnmount() {
    this.isActive = false
  }

  render() {
    return (
      <React.Fragment>
        {(this.state.isCreating || this.state.selectedEvent) && <Backdrop />}
        {this.state.isCreating && (
          <Modal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm"
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={this.priceElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" ref={this.dateElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="description">Description</label>
                <textarea
                  rows="4"
                  id="description"
                  ref={this.descriptionElRef}
                ></textarea>
              </div>
            </form>
          </Modal>
        )}
        {this.state.selectedEvent && (
          <Modal
            title={this.state.selectedEvent.title}
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.bookEventHandler}
            confirmText={this.context.token ? 'Book' : 'Confirm'}
          >
            <h1>{this.state.selectedEvent.title}</h1>
            <h2>
              ${this.state.selectedEvent.price} -{' '}
              {new Date(this.state.selectedEvent.date).toLocaleDateString()}
            </h2>
            <p>{this.state.selectedEvent.description}</p>
          </Modal>
        )}
        {this.context.token && (
          <div className="events-control">
            <p>Want to host an event? Add it to our roster!</p>
            <button className="btn" onClick={this.startCreateEventHandler}>
              Create Event
            </button>
          </div>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
            {/* <h3>Events for {this.state.currentMonth}:</h3> */}
            <EventList
              events={this.state.events}
              authUserId={this.context.userId}
              onViewDetail={this.showDetailHandler}
            />
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default EventsPage
