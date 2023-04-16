import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdCancel, MdLightbulbOutline} from 'react-icons/md'
// import {CiLight} from 'react-icons/'
import {BsMoon} from 'react-icons/bs'
import Cookies from 'js-cookie'
import HeaderContext from '../../context/HeaderContext'
import websiteLogo from '../../images/websiteLogo.png'
import './index.css'

class Header extends Component {
  state = {
    // activeSearch: '',
    showOptions: false,
    showSmSearch: false,
  }

  toggleOptions = () => {
    this.setState({
      showOptions: true,
      showSmSearch: false,
    })
  }

  showSearchBar = () => {
    this.setState({showSmSearch: true})
  }

  // updateSearch = event => {
  //   const search = event.target.value
  //   this.setState({activeSearch: search})
  // }

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  // requestDefaultView = () => {
  //   const {defaultView} = this.props

  //   this.setState({activeSearch: ''}, defaultView)
  // }

  onClickSmCancel = () => {
    console.log('smcancel')
    this.setState({showOptions: false})
  }

  // requestShowSearchPage = e => {
  //   const {showSearchPage} = this.props

  //   showSearchPage(e)
  // }

  renderSmOptions = () => {
    const {showSmSearch, activeSearch} = this.state
    const {activePage} = this.props
    return (
      <HeaderContext.Consumer>
        {value => {
          const {
            updateSearch,
            updateShowSearchResults,
            // requestSearchResultsApi,
            isDarkTheme,
            toggleTheme,
          } = value

          const onUpdateSearch = event => {
            updateSearch(event.target.value)
          }

          const onShowSearchResults1 = event => {
            if (event.key === 'Enter') {
              updateShowSearchResults(true)
              // requestSearchResultsApi()
            }
          }

          const onShowSearchResults2 = () => {
            updateShowSearchResults(true)
            // requestSearchResultsApi()
          }

          const defaultView = () => {
            updateShowSearchResults(false)
          }

          const onToggleTheme = () => {
            toggleTheme()
          }

          const navLinkTheme = isDarkTheme
            ? 'nav-link-dark-theme'
            : 'nav-link-light-theme'

          if (showSmSearch) {
            return (
              <>
                <div className="sm-search-bg">
                  <div className="sm-search-container">
                    <input
                      type="search"
                      value={activeSearch}
                      onChange={onUpdateSearch}
                      onKeyDown={onShowSearchResults1}
                      placeholder="Search Caption"
                      className="search sm-search"
                    />
                    <div className="search-icon-container sm-search-icon">
                      <button
                        type="button"
                        data-testid="searchIcon"
                        onClick={onShowSearchResults2}
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
                    activePage === 'HOME'
                      ? `active-header-section ${navLinkTheme} `
                      : `header-section ${navLinkTheme} `
                  }`}
                  onClick={defaultView}
                >
                  Home
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={this.showSearchBar}
                  className={`sm-search-option-btn ${navLinkTheme}`}
                >
                  Search
                </button>
              </li>
              <li>
                <Link
                  to="/my-profile"
                  className={`${
                    activePage === 'PROFILE'
                      ? `active-header-section ${navLinkTheme} `
                      : `header-section ${navLinkTheme} `
                  }`}
                  onClick={defaultView}
                >
                  Profile
                </Link>
              </li>
              <li>
                {isDarkTheme ? (
                  <BsMoon className="dark-theme-icon" onClick={onToggleTheme} />
                ) : (
                  <MdLightbulbOutline
                    className="light-theme-icon"
                    onClick={onToggleTheme}
                  />
                )}
              </li>
              <li>
                <button
                  type="button"
                  className="logout-btn "
                  onClick={this.logout}
                >
                  Logout
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="sm-cancel-btn"
                  onClick={this.onClickSmCancel}
                >
                  <MdCancel className={`sm-cancel ${navLinkTheme}`} />
                </button>
              </li>
            </ul>
          )
        }}
      </HeaderContext.Consumer>
    )
  }

  render() {
    const {activePage} = this.props

    const {showOptions} = this.state
    return (
      <HeaderContext.Consumer>
        {value => {
          const {
            search,
            updateSearch,
            updateShowSearchResults,
            toggleTheme,
            isDarkTheme,
          } = value

          const onUpdateSearch = event => {
            updateSearch(event.target.value)
          }

          const onShowSearchResults1 = event => {
            if (event.key === 'Enter') {
              updateShowSearchResults(true)
            }
          }

          const onShowSearchResults2 = () => {
            updateShowSearchResults(true)
          }

          const defaultView = () => {
            updateShowSearchResults(false)
          }

          const onToggleTheme = () => {
            toggleTheme()
          }
          const navTheme = isDarkTheme ? 'nav-dark-theme' : 'nav-light-theme'
          const navLinkTheme = isDarkTheme
            ? 'nav-link-dark-theme'
            : 'nav-link-light-theme'

          return (
            <nav className={`nav-bg ${navTheme}`}>
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
                        value={search}
                        onChange={onUpdateSearch}
                        onKeyDown={onShowSearchResults1}
                        placeholder="Search Caption"
                        className="search"
                      />
                      <div className="search-icon-container">
                        <button
                          type="button"
                          data-testid="searchIcon"
                          onClick={onShowSearchResults2}
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
                            ? `active-header-section ${navLinkTheme} `
                            : `header-section ${navLinkTheme} `
                        }`}
                        onClick={defaultView}
                      >
                        Home
                      </Link>
                    </li>

                    <li>
                      <Link
                        className={`${
                          activePage === 'PROFILE'
                            ? `active-header-section ${navLinkTheme} `
                            : `header-section ${navLinkTheme} `
                        }`}
                        to="/my-profile"
                        onClick={defaultView}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      {isDarkTheme ? (
                        <BsMoon
                          className="dark-theme-icon"
                          onClick={onToggleTheme}
                        />
                      ) : (
                        <MdLightbulbOutline
                          className="light-theme-icon"
                          onClick={onToggleTheme}
                        />
                      )}
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
                    <GiHamburgerMenu className={`hamburger ${navLinkTheme}`} />
                  </button>
                </div>
                <div className="sm-options-container">
                  {showOptions && this.renderSmOptions()}
                </div>
              </div>
            </nav>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default withRouter(Header)
