import React from 'react'
import '../../styles/EventItem.css'

const eventItem = (props) => {
  return (
    <li key={props.eventId} className="events_list-item">
      <div>
        <h1>{props.title}</h1>
        <h2>
          ${props.price} - {new Date(props.date).toLocaleDateString()}
        </h2>
      </div>
      <div>
        {props.userId !== props.creatorId ? (
          <button
            className="btn"
            onClick={props.onDetail.bind(this, props.eventId)}
          >
            View Details
          </button>
        ) : (
          <p>You are the owner of this event</p>
        )}
      </div>
    </li>
  )
}

export default eventItem
