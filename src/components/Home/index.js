import {Component} from 'react'

import Header from '../Header'
import UserStories from '../UserStories'

import SearchResult from '../SearchResults'
import HomePagePosts from '../HomePagePosts'
// import Loader from 'react-loader-spinner'

import './index.css'

class Home extends Component {
  state = {
    showSearchPage: false,

    search: '',
  }

  updateSearch = value => {
    this.setState({search: value, showSearchPage: true})
  }

  defaultView = () => {
    this.setState({showSearchPage: false})
  }

  renderFinalView = () => (
    <div>
      <UserStories />
      <HomePagePosts />
    </div>
  )

  render() {
    console.log('in home')
    const {showSearchPage, search} = this.state
    return (
      <div>
        <Header
          updateSearch={this.updateSearch}
          defaultView={this.defaultView}
        />
        {showSearchPage ? (
          <SearchResult search={search} />
        ) : (
          this.renderFinalView()
        )}
      </div>
    )
  }
}
export default Home
