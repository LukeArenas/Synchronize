import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <div>
        <h1>Synchronize</h1>
      </div>
      <ul>
        <li>
          <div>
            <NavLink to="auth">Login/Register</NavLink>
          </div>
        </li>
        <li>
          <div>
            <NavLink to="calendar">Calendar</NavLink>
          </div>
        </li>
      </ul>
    </header>
  )
}

export default Navbar
