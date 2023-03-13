import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import login from '../images/login.png'
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
        <div>
          <img src={login} alt="website login" />
          <img src="" alt="website logo" />
          <h1>Insta Share</h1>
          <form onSubmit={this.onSubmitForm}>
            <label htmlFor="username">USERNAME</label>
            <br />
            <input
              id="username"
              type="text"
              value={username}
              onChange={this.onChangeUsername}
            />
            <br />
            <label htmlFor="password">PASSWORD</label> <br />
            <input
              id="password"
              type="password"
              value={password}
              onChange={this.onChangePassword}
            />
            <br />
            {errorMsg !== '' && <p>*{errorMsg}</p>}
            <button type="submit">Login</button>
            <p>rahul@2021</p>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
