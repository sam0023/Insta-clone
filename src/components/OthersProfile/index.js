import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import HeaderContext from '../../context/HeaderContext'
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

const OthersProfile = props => {
  const [activeView, setActiveView] = useState(viewOptions.loading)
  const [details, setDetails] = useState({})

  const {match} = props

  const handleFailureApi = () => {
    setActiveView(viewOptions.failure)
  }

  const handleSuccessApi = data => {
    const updatedData = data.user_details

    setDetails(updatedData)
    setActiveView(viewOptions.success)
  }

  const requestUserProfileApi = async () => {
    setActiveView(viewOptions.loading)

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
      handleSuccessApi(data)
    } else {
      handleFailureApi()
    }
  }

  useEffect(() => {
    requestUserProfileApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Spinner />
    </div>
  )

  const renderFailureView = () => (
    <div>
      <FailureView apiRequest={requestUserProfileApi} />
    </div>
  )

  const renderSuccessView = () => (
    <CommonProfile
      details={details}
      profileAlt="user profile"
      storyAlt="user story"
      postAlt="user post"
    />
  )

  const renderFinalView = () => {
    switch (activeView) {
      case viewOptions.loading:
        return renderLoadingView()
      case viewOptions.success:
        return renderSuccessView()
      case viewOptions.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <HeaderContext.Consumer>
      {value => {
        const {
          showSearchResults,
          search,
          updateSearchResults,
          isDarkTheme,
        } = value
        const profileTheme = isDarkTheme ? 'home-bg-dark' : 'home-bg-light'
        return (
          <div className={`profile-bg ${profileTheme}`}>
            <Header />
            {showSearchResults ? (
              <SearchResults search={search} update={updateSearchResults} />
            ) : (
              renderFinalView()
            )}
          </div>
        )
      }}
    </HeaderContext.Consumer>
  )
}

export default OthersProfile
