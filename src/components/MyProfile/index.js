import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import HeaderContext from '../../context/HeaderContext'
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

const MyProfile = () => {
  const [activeView, setActiveView] = useState(viewOptions.loading)
  const [details, setDetails] = useState({})

  const handleFailureApi = () => {
    setActiveView(viewOptions.failure)
  }

  const handleSuccessApi = data => {
    const updatedData = data.profile

    setDetails(updatedData)
    setActiveView(viewOptions.success)
  }

  const requestUserProfileApi = async () => {
    setActiveView(viewOptions.loading)
    const api = `https://apis.ccbp.in/insta-share/my-profile`

    const accessToken = Cookies.get('jwt_token')

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
      profileAlt="my profile"
      storyAlt="my story"
      postAlt="my post"
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
            <Header activePage="PROFILE" />

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

export default MyProfile
