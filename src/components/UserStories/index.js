import {Component, useState, useEffect} from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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

const UserStories = () => {
  const [activeView, setActiveView] = useState(viewOptions.loading)
  const [stories, setStories] = useState([])

  const handleSuccessApi = data => {
    const userStories = data.users_stories
    const updatedStories = userStories.map(eachItem => ({
      userId: eachItem.user_id,
      userName: eachItem.user_name,
      storyUrl: eachItem.story_url,
    }))

    setStories(updatedStories)
    setActiveView(viewOptions.success)
  }

  useEffect(() => {
    const requestUserStoriesApi = async () => {
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
        handleSuccessApi(data)
      } else {
        setActiveView(viewOptions.failure)
      }
    }
    requestUserStoriesApi()
  }, [])

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Spinner />
    </div>
  )

  const renderFailureView = () => (
    <div className="home-failure-bg">
      <FailureView apiRequest={this.requestUserStoriesApi} />
    </div>
  )

  const renderSuccessView = () => {
    console.log('stories')
    console.log(stories)
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
            slidesToShow: 3,
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

  return renderFinalView()
}

export default UserStories
