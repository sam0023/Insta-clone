import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Spinner from '../Spinner'
import FailureView from '../FailureView'
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
    // console.log(updatedStories)
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
    // console.log(response)
    if (response.ok) {
      this.handleSuccessApi(data)
    } else {
      this.setState({activeView: viewOptions.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Spinner />
    </div>
  )

  renderFailureView = () => (
    <div className="home-failure-bg">
      <FailureView apiRequest={this.requestUserStoriesApi} />
    </div>
  )

  renderSuccessView = () => {
    const {stories} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className="slider-container">
        <Slider {...settings} className="slider">
          {stories.map(eachItem => (
            <div key={eachItem.userId} className="home-story-container">
              <div className="img-container">
                <div className="slider-img-container">
                  <img
                    src={eachItem.storyUrl}
                    alt="user story"
                    className="slider-img"
                  />
                </div>
              </div>
              <p className="slider-img-name">{eachItem.userName}</p>
            </div>
          ))}
        </Slider>
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
    return this.renderFinalView()
  }
}
export default UserStories
