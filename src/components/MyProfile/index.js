import {Component} from 'react'
import Cookies from 'js-cookie'

import Spinner from '../Spinner'
import Header from '../Header'
import CommonProfile from '../CommonProfile'
import SearchResults from '../SearchResults'
import FailureView from '../FailureView'
import './index.css'

const viewOptions = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
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

  showSearchPage = e => {
    this.setState({showSearchPage: e})
  }

  updateSearch = value => {
    this.setState({search: value, showSearchResults: true})
  }

  handleFailureApi = () => {
    this.setState({activeView: viewOptions.failure})
  }

  handleSuccessApi = data => {
    const updatedData = data.profile
    this.setState({details: updatedData, activeView: viewOptions.success})
  }

  requestUserProfileApi = async () => {
    this.setState({activeView: viewOptions.loading})
    const api = `https://apis.ccbp.in/insta-share/my-profile`
    // const {match} = this.props
    // const {params} = match
    // const {id} = params
    const accessToken = Cookies.get('jwt_token')
    // const api = `https://apis.ccbp.in/insta-share/users/${id}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    console.log('in my profile')
    const response = await fetch(api, option)
    const data = await response.json()
    console.log(response)
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
      <CommonProfile
        details={details}
        profileAlt="my profile"
        storyAlt="my story"
        postAlt="my post"
      />
    )
  }

  renderFinalView = () => {
    const {activeView} = this.state

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
      <div className="profile-bg">
        <Header
          updateSearch={this.updateSearch}
          defaultView={this.defaultView}
          showSearchPage={this.showSearchPage}
          activePage="PROFILE"
        />
        {/* <div className="profile-views-bg"> */}
        {showSearchResults ? (
          <SearchResults search={search} />
        ) : (
          this.renderFinalView()
        )}
        {/* </div> */}
      </div>
    )
  }
}
export default MyProfile
