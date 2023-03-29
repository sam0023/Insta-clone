import {Component} from 'react'

import {FaSearch} from 'react-icons/fa'
import Header from '../Header'
import UserStories from '../UserStories'

import SearchResult from '../SearchResults'
import HomePagePosts from '../HomePagePosts'
// import Loader from 'react-loader-spinner'

import './index.css'

class Home extends Component {
  state = {
    showSearchResults: false,
    showSearchPage: false,
    search: '',
    updateSearch: true,
  }

  updateSearch = value => {
    this.setState(prev => ({
      search: value,
      showSearchResults: true,
      updateSearch: !prev.updateSearch,
    }))
  }

  defaultView = () => {
    this.setState({showSearchResults: false, showSearchPage: false})
  }

  showSearchPage = e => {
    this.setState({showSearchPage: e})
  }

  renderSearchView = () => (
    <div className="search-page-bg">
      <div className="search-page">
        <div>
          <FaSearch className="sm-search-page-icon" />
        </div>
        <p>Search appears here</p>
      </div>
      <div className="home-page-container2">
        <UserStories />
        <HomePagePosts />
      </div>
    </div>
  )

  renderFinalView = () => {
    const {showSearchPage} = this.state

    if (showSearchPage) {
      return this.renderSearchView()
    }
    return (
      <div className="home-page-container">
        <UserStories />
        <HomePagePosts />
      </div>
    )
  }

  render() {
    const {showSearchResults, search, updateSearch} = this.state

    return (
      <div className="home-bg">
        <Header
          updateSearch={this.updateSearch}
          defaultView={this.defaultView}
          showSearchPage={this.showSearchPage}
          activePage="HOME"
        />
        {showSearchResults ? (
          <SearchResult search={search} updateSearch={updateSearch} />
        ) : (
          this.renderFinalView()
        )}
      </div>
    )
  }
}
export default Home
