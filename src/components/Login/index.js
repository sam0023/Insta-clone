import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import loginPageLg from '../../images/loginPageLg.png'
import websiteLogo from '../../images/websiteLogo.png'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  renderSuccessView = data => {
    Cookies.set('jwt_token', data.jwt_token, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  renderFailureView = async data => {
    // gconsole.lo(data.error_msg)
    this.setState({errorMsg: data.error_msg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const credentials = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
    }
    // console.log('here')
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    // console.log(response)

    if (response.ok) {
      this.renderSuccessView(data)
    } else {
      this.renderFailureView(data)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg} = this.state
    // console.log('in login page')
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <img src={loginPageLg} alt="website login" className="login-img" />
        <div className="form-card">
          <img src={websiteLogo} alt="website logo" className="login-logo" />
          <h1 className="login-website-name">Insta Share</h1>
          <form onSubmit={this.onSubmitForm} className="login-form">
            <label htmlFor="username" className="form-label">
              USERNAME
            </label>
            <br />
            <input
              id="username"
              type="text"
              value={username}
              onChange={this.onChangeUsername}
              className="form-input"
              placeholder="USERNAME"
            />
            <br />
            <label htmlFor="password" className="form-label">
              PASSWORD
            </label>{' '}
            <br />
            <input
              id="password"
              type="password"
              value={password}
              onChange={this.onChangePassword}
              className="form-input"
              placeholder="PASSWORD"
            />
            {errorMsg !== '' && <p className="warning-msg">*{errorMsg}</p>}
            <button className="login-btn" type="submit">
              Login
            </button>
            <p className="user-details1">Username: rahul</p>
            <p className="user-details">Password: rahul@2021</p>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
