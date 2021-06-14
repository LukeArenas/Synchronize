import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/MainNavigation.css'
import AuthContext from '../context/auth-context'

const MainNavigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <header className="main-navigation">
            <div className="main-navigation_logo">
              <h1>Synchronize</h1>
            </div>
            <nav className="main-navigation_items">
              <ul>
                {!context.token && (
                  <li>
                    <NavLink to="/auth">Login/Register</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/events">Events</NavLink>
                </li>
                {context.token && (
                  <React.Fragment>
                    <li>
                      <NavLink to="/bookings">Calendar</NavLink>
                    </li>
                    <li>
                      <button onClick={context.logout}>Logout</button>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </nav>
          </header>
        )
      }}
    </AuthContext.Consumer>
  )
}

export default MainNavigation
