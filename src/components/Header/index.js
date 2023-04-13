import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdCancel} from 'react-icons/md'
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
                      ? 'active-header-section'
                      : 'header-section'
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
                  onClick={defaultView}
                >
                  Profile
                </Link>
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
                  <MdCancel className="sm-cancel" />
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

    const {
      // activeSearch,
      showOptions,
      // showSearchResults,
      // toggleSearchResults,
    } = this.state
    return (
      <HeaderContext.Consumer>
        {value => {
          const {
            search,
            updateSearch,
            updateShowSearchResults,
            // requestSearchResultsApi,
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

          // const onShowSearchResults = () => {
          //   const {updateSearch} = this.props
          //   const {activeSearch} = this.state
          //   updateSearch(activeSearch)
          // }

          const defaultView = () => {
            updateShowSearchResults(false)
          }

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
                            ? 'active-header-section'
                            : 'header-section'
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
                            ? 'active-header-section'
                            : 'header-section'
                        }`}
                        to="/my-profile"
                        onClick={defaultView}
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
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default withRouter(Header)
