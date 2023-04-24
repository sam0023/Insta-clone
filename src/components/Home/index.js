import Header from '../Header'
import UserStories from '../UserStories'
import HeaderContext from '../../context/HeaderContext'
import SearchResult from '../SearchResults'
import HomePagePosts from '../HomePagePosts'
import './index.css'

const Home = () => {
  const renderFinalView = () => (
    <div className="home-page-container">
      <UserStories />
      <HomePagePosts />
    </div>
  )

  return (
    <HeaderContext.Consumer>
      {value => {
        const {
          showSearchResults,
          search,
          updateSearchResults,
          isDarkTheme,
        } = value
        const homeTheme = isDarkTheme ? 'home-bg-dark' : 'home-bg-light'
        return (
          <div className={`home-bg  ${homeTheme}`}>
            <Header activePage="HOME" />
            {showSearchResults ? (
              <SearchResult search={search} update={updateSearchResults} />
            ) : (
              renderFinalView()
            )}
          </div>
        )
      }}
    </HeaderContext.Consumer>
  )
}
export default Home
