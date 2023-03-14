import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import Cookies from 'js-cookie'
import logo from '../images/logo.png'
import './index.css'

class Header extends Component {
  state = {
    activeSearch: '',
  }

  requestUpdateSearch = event => {
    if (event.key === 'Enter') {
      const {updateSearch} = this.props
      const {activeSearch} = this.state
      updateSearch(activeSearch)
    }
  }

  requestUpdateSearch2 = () => {
    const {updateSearch} = this.props
    const {activeSearch} = this.state
    updateSearch(activeSearch)
  }

  updateSearch = event => {
    const search = event.target.value
    this.setState({activeSearch: search})
  }

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  requestDefaultView = () => {
    const {defaultView} = this.props

    this.setState({activeSearch: ''}, defaultView)
  }

  render() {
    const {activePage} = this.props
    const {activeSearch} = this.state
    return (
      <nav className="header-bg">
        <div>
          <Link to="/" onClick={this.requestDefaultView}>
            <img src={logo} alt="website logo" />
          </Link>
          <h1>Insta Share</h1>
        </div>

        <ul className="nav-large-screen-options">
          <li>
            <input
              type="search"
              value={activeSearch}
              onChange={this.updateSearch}
              onKeyDown={this.requestUpdateSearch}
              placeholder="Search Caption"
            />
            <button
              type="button"
              data-testid="searchIcon"
              onClick={this.requestUpdateSearch2}
            >
              <FaSearch />
            </button>
          </li>
          <li>
            <Link
              to="/"
              className={`${
                activePage === 'HOME' ? 'active-header-button' : 'header-button'
              }`}
              onClick={this.requestDefaultView}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              className={`${
                activePage === 'PROFILE'
                  ? 'active-header-button'
                  : 'header-button'
              }`}
              to="/my-profile"
              onClick={this.requestDefaultView}
            >
              Profile
            </Link>
          </li>
          <li>
            <button type="button" onClick={this.logout}>
              Logout
            </button>
          </li>
        </ul>
        <button type="button" className="hamburger">
          <GiHamburgerMenu />
        </button>
      </nav>
    )
  }
}

export default withRouter(Header)
