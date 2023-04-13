import {Component} from 'react'

// import {FaSearch} from 'react-icons/fa'
import Header from '../Header'
import UserStories from '../UserStories'
import HeaderContext from '../../context/HeaderContext'
import SearchResult from '../SearchResults'
import HomePagePosts from '../HomePagePosts'
// import Loader from 'react-loader-spinner'

import './index.css'

class Home extends Component {
  // state = {
  //   showSearchResults: false,
  //   showSearchPage: false,

  //   updateSearch: true,
  // }

  // defaultView = () => {
  //   this.setState({showSearchResults: false, showSearchPage: false})
  // }

  // showSearchPage = e => {
  //   this.setState({showSearchPage: e})
  // }

  // renderSearchView = () => (
  //   <div className="search-page-bg">
  //     <div className="search-page">
  //       <div>
  //         <FaSearch className="sm-search-page-icon" />
  //       </div>
  //       <p>Search appears here</p>
  //     </div>
  //     <div className="home-page-container2">
  //       <UserStories />
  //       <HomePagePosts />
  //     </div>
  //   </div>
  // )

  renderFinalView = () => (
    // if (showSearchResults) {
    //   return this.renderSearchView()
    // }
    <div className="home-page-container">
      <UserStories />
      <HomePagePosts />
    </div>
  )

  render() {
    // const {showSearchResults, search, updateSearch} = this.state

    return (
      <HeaderContext.Consumer>
        {value => {
          const {showSearchResults, search, updateSearchResults} = value
          return (
            <div className="home-bg">
              <Header activePage="HOME" />
              {showSearchResults ? (
                <SearchResult search={search} update={updateSearchResults} />
              ) : (
                this.renderFinalView()
              )}
            </div>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}
export default Home
