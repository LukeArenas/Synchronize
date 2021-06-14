import React, { Component } from 'react'
import '../styles/Auth.css'
import AuthContext from '../context/auth-context'
import { BASE_URL } from '../globals'

class AuthPage extends Component {
  state = {
    isLoggedIn: true
  }

  static contextType = AuthContext

  constructor(props) {
    super(props)
    this.emailEl = React.createRef()
    this.passwordEl = React.createRef()
  }

  switchModeHandler = () => {
    this.setState((prevState) => {
      return { isLoggedIn: !prevState.isLoggedIn }
    })
  }

  submitHandler = (e) => {
    e.preventDefault()
    const email = this.emailEl.current.value
    const password = this.passwordEl.current.value

    //some validation
    if (email.trim().length === 0 || password.trim().length === 0) {
      return
    }

    //backend request

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    }

    if (!this.state.isLoggedIn) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          } 
        `
      }
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
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          )
        }
      })
      .catch((err) => {
        console.log(err)
      }) //could use axios instead
  }

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={this.switchModeHandler}>
            {this.state.isLoggedIn ? 'Signup' : 'Login'}
          </button>
        </div>
      </form>
    )
  }
}

export default AuthPage
