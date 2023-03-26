import {Component} from 'react'

import Cookies from 'js-cookie'
import Spinner from '../Spinner'
import CommonProfile from '../CommonProfile'
import Header from '../Header'
import SearchResults from '../SearchResults'
import FailureView from '../FailureView'

const viewOptions = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class OthersProfile extends Component {
  state = {
    activeView: viewOptions.loading,
    details: {},
    showSearchResults: false,
    search: '',
    showSearchPage: false,
  }

  componentDidMount() {
    this.requestUserProfileApi()
  }

  defaultView = () => {
    this.setState({showSearchResults: false})
  }

  updateSearch = value => {
    this.setState({search: value, showSearchResults: true})
  }

  handleFailureApi = () => {
    this.setState({activeView: viewOptions.failure})
  }

  handleSuccessApi = data => {
    const updatedData = data.user_details
    this.setState({details: updatedData, activeView: viewOptions.success})
  }

  showSearchPage = e => {
    this.setState({showSearchPage: e})
  }

  requestUserProfileApi = async () => {
    this.setState({activeView: viewOptions.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const accessToken = Cookies.get('jwt_token')
    const api = `https://apis.ccbp.in/insta-share/users/${id}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const response = await fetch(api, option)

    const data = await response.json()

    if (response.ok) {
      this.handleSuccessApi(data)
    } else {
      this.handleFailureApi()
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Spinner />
    </div>
  )

  renderFailureView = () => (
    <div>
      <FailureView apiRequest={this.requestUserProfileApi} />
    </div>
  )

  renderSearchView = () => {
    const {details} = this.state
    return (
      <>
        <div className="search-page">
          <p>Search appears here</p>
        </div>
        <div className="home-page-container2">
          <CommonProfile
            details={details}
            profileAlt="my profile"
            storyAlt="my story"
            postAlt="my post"
          />
        </div>
      </>
    )
  }

  renderSuccessView = () => {
    const {showSearchPage, details} = this.state

    if (showSearchPage) {
      return this.renderSearchView()
    }
    return (
      <div className="profile-bg">
        <CommonProfile
          details={details}
          profileAlt="user profile"
          storyAlt="user story"
          postAlt="user post"
        />
      </div>
    )
  }

  renderFinalView = () => {
    const {activeView} = this.state
    console.log(`active view ${activeView}`)
    switch (activeView) {
      case viewOptions.loading:
        return this.renderLoadingView()
      case viewOptions.success:
        return this.renderSuccessView()
      case viewOptions.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {showSearchResults, search} = this.state
    return (
      <div>
        <Header
          updateSearch={this.updateSearch}
          defaultView={this.defaultView}
          showSearchPage={this.showSearchPage}
        />
        {showSearchResults ? (
          <SearchResults search={search} />
        ) : (
          this.renderFinalView()
        )}
        {/* {this.renderFinalView()} */}
      </div>
    )
  }
}
export default OthersProfile
