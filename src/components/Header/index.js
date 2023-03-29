import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdCancel} from 'react-icons/md'
import Cookies from 'js-cookie'
import websiteLogo from '../../images/websiteLogo.png'
import './index.css'

class Header extends Component {
  state = {
    activeSearch: '',
    showOptions: false,
    showSmSearch: false,
  }

  requestUpdateSearch = event => {
    if (event.key === 'Enter') {
      const {updateSearch} = this.props
      const {activeSearch} = this.state
      updateSearch(activeSearch)
    }
  }

  toggleOptions = () => {
    this.setState(
      {
        showOptions: true,
        showSmSearch: false,
      },
      this.requestShowSearchPage(false),
    )
  }

  showSearchBar = () => {
    this.setState({showSmSearch: true}, this.requestShowSearchPage(true))
  }

  requestUpdateSearch2 = () => {
    const {updateSearch} = this.props
    const {activeSearch} = this.state
    updateSearch(activeSearch)
    console.log('duhododhfvodfvndf')
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

  onClickSmCancel = () => {
    console.log('smcancel')
    this.setState({showOptions: false})
  }

  requestShowSearchPage = e => {
    const {showSearchPage} = this.props

    showSearchPage(e)
  }

  renderSmOptions = () => {
    const {showSmSearch, activeSearch} = this.state
    const {activePage} = this.props

    if (showSmSearch) {
      return (
        <>
          <div className="sm-search-bg">
            <div className="sm-search-container">
              <input
                type="search"
                value={activeSearch}
                onChange={this.updateSearch}
                onKeyDown={this.requestUpdateSearch}
                placeholder="Search Caption"
                className="search sm-search"
              />
              <div className="search-icon-container sm-search-icon">
                <button
                  type="button"
                  data-testid="searchIcon"
                  onClick={this.requestUpdateSearch2}
                  className="search-icon-btn"
                >
                  <FaSearch className="nav-search-icon" />
                </button>
              </div>
            </div>
          </div>
        </>
      )
    }
    return (
      <ul className="nav-sm-options-container">
        <li>
          <Link
            to="/"
            className={`${
              activePage === 'HOME' ? 'active-header-section' : 'header-section'
            }`}
            onClick={this.requestDefaultView}
          >
            Home
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={this.showSearchBar}
            className="sm-search-option-btn"
          >
            Search
          </button>
        </li>
        <li>
          <Link
            to="/my-profile"
            className={`${
              activePage === 'PROFILE'
                ? 'active-header-section'
                : 'header-section'
            }`}
            onClick={this.requestDefaultView}
          >
            Profile
          </Link>
        </li>
        <li>
          <button type="button" className="logout-btn " onClick={this.logout}>
            Logout
          </button>
        </li>
        <li>
          <button
            type="button"
            className="sm-cancel-btn"
            onClick={this.onClickSmCancel}
          >
            <MdCancel className="sm-cancel" />
          </button>
        </li>
      </ul>
    )
  }

  render() {
    const {activePage} = this.props
    console.log('activePage')
    console.log(activePage)
    const {activeSearch, showOptions} = this.state
    return (
      <nav className="nav-bg">
        <div className="t1">
          <div className="nav-lg-container">
            <div className="nav-logo-container">
              <Link to="/" onClick={this.requestDefaultView}>
                <img
                  src={websiteLogo}
                  alt="website logo"
                  className="website-logo"
                />
              </Link>
              <h1 className="logo-name">Insta Share</h1>
            </div>

            <ul className="nav-large-screen-options">
              <li className="search-container">
                <input
                  type="search"
                  value={activeSearch}
                  onChange={this.updateSearch}
                  onKeyDown={this.requestUpdateSearch}
                  placeholder="Search Caption"
                  className="search"
                />
                <div className="search-icon-container">
                  <button
                    type="button"
                    data-testid="searchIcon"
                    onClick={this.requestUpdateSearch2}
                    className="search-icon-btn"
                  >
                    <FaSearch className="nav-search-icon" />
                  </button>
                </div>
              </li>
              <li>
                <Link
                  to="/"
                  className={`${
                    activePage === 'HOME'
                      ? 'active-header-section'
                      : 'header-section'
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
                      ? 'active-header-section'
                      : 'header-section'
                  }`}
                  to="/my-profile"
                  onClick={this.requestDefaultView}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="logout-btn"
                  onClick={this.logout}
                >
                  Logout
                </button>
              </li>
            </ul>

            <button
              type="button"
              onClick={this.toggleOptions}
              className="hamburger"
            >
              <GiHamburgerMenu className="hamburger" />
            </button>
          </div>
          <div className="sm-options-container">
            {showOptions && this.renderSmOptions()}
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
