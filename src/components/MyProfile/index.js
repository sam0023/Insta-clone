import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CommonProfile from '../CommonProfile'
import SearchResults from '../SearchResults'

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
    <div className="loader-container" testid="loader">
      <Loader
        className="loader"
        type="ThreeDots"
        color="#222222"
        height="50"
        width="50"
      />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img src="" alt="failure view" />
      <p>Something went wrong. Please try again</p>

      <button type="submit" onClick={this.requestUserProfileApi}>
        Try again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {details} = this.state
    console.log(details)
    return (
      <div>
        <CommonProfile
          details={details}
          profileAlt="my profile"
          storyAlt="my story"
          postAlt="my post"
        />
      </div>
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
      <div>
        <Header
          updateSearch={this.updateSearch}
          defaultView={this.defaultView}
        />
        {showSearchResults ? (
          <SearchResults search={search} />
        ) : (
          this.renderFinalView()
        )}
      </div>
    )
  }
}
export default MyProfile
