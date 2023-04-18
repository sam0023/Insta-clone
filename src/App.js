import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
// import Cookies from 'js-cookie'
import HeaderContext from './context/HeaderContext'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import OthersProfile from './components/OthersProfile'
import MyProfile from './components/MyProfile'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {
    search: '',
    isDarkTheme: false,
    showSearchResults: false,
    updateSearchResults: false,
  }

  updateSearch = search => {
    this.setState({search, updateSearchResults: false})
  }

  toggleTheme = () => {
    this.setState(prev => ({isDarkTheme: !prev.isDarkTheme}))
  }

  updateShowSearchResults = value => {
    this.setState({showSearchResults: value, updateSearchResults: true})
  }

  render() {
    const {
      search,
      isDarkTheme,
      showSearchResults,
      updateSearchResults,
    } = this.state
    return (
      <HeaderContext.Provider
        value={{
          search,
          updateSearch: this.updateSearch,
          isDarkTheme,
          toggleTheme: this.toggleTheme,
          showSearchResults,
          updateShowSearchResults: this.updateShowSearchResults,

          updateSearchResults,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/users/:id" component={OthersProfile} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <Route exact path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </HeaderContext.Provider>
    )
  }
}

export default App
