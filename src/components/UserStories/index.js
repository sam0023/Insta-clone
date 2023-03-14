import Slider from 'react-slick'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const viewOptions = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserStories extends Component {
  state = {
    activeView: viewOptions.loading,
    stories: [],
  }

  componentDidMount() {
    this.requestUserStoriesApi()
  }

  handleSuccessApi = data => {
    const stories = data.users_stories
    const updatedStories = stories.map(eachItem => ({
      userId: eachItem.user_id,
      userName: eachItem.user_name,
      storyUrl: eachItem.story_url,
    }))
    console.log(updatedStories)
    this.setState({activeView: viewOptions.success, stories: updatedStories})
  }

  requestUserStoriesApi = async () => {
    const accessToken = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const api = `https://apis.ccbp.in/insta-share/stories`

    const response = await fetch(api, option)
    const data = await response.json()
    console.log(response)
    if (response.ok) {
      this.handleSuccessApi(data)
    } else {
      this.setState({activeView: viewOptions.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader
        className="loader"
        type="ThreeDots"
        color="#ffffff"
        height="50"
        width="50"
      />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img src="" alt="failure view" />
      <p>Something went wrong. Please try again</p>

      <button type="button" onClick={this.requestUserStoriesApi}>
        Try again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {stories} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 3,
    }
    return (
      <ul className="slider-container">
        <Slider {...settings}>
          {stories.map(eachItem => (
            <li key={eachItem.userId}>
              <img src={eachItem.storyUrl} alt="user story" />
              <p>{eachItem.userName}</p>
            </li>
          ))}
        </Slider>
      </ul>
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
    return this.renderFinalView()
  }
}
export default UserStories
