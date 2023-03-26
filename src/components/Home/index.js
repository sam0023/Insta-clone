import {Component} from 'react'

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
  }

  updateSearch = value => {
    this.setState({search: value, showSearchResults: true})
  }

  defaultView = () => {
    this.setState({showSearchResults: false, showSearchPage: false})
  }

  showSearchPage = e => {
    this.setState({showSearchPage: e})
  }

  renderSearchView = () => (
    <>
      <div className="search-page">
        <p>Search appears here</p>
      </div>
      <div className="home-page-container2">
        <UserStories />
        <HomePagePosts />
      </div>
    </>
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
    console.log('in home')
    const {showSearchResults, search} = this.state
    return (
      <div className="home-bg">
        <Header
          updateSearch={this.updateSearch}
          defaultView={this.defaultView}
          showSearchPage={this.showSearchPage}
          activePage="HOME"
        />
        {showSearchResults ? (
          <SearchResult search={search} />
        ) : (
          this.renderFinalView()
        )}
      </div>
    )
  }
}
export default Home
