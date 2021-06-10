import React from 'react'
import '../styles/Modal.css'

const createModal = () => {
  return (
    <div className="modal">
      <header className="modal_header">
        <h1>Create Event</h1>
      </header>
      <section className="modal_content">content here</section>
      <section className="modal_actions">
        <button>Confirm</button>
        <button>Cancel</button>
        {/* {props.canConfirm && (
          <button className="btn" onClick={props.onConfirm}>
            Confirm
          </button>
        )}
        {props.canCancel && (
          <button className="btn" onClick={props.onCancel}>
            Cancel
          </button>
        )} */}
      </section>
    </div>
  )
}

export default createModal
