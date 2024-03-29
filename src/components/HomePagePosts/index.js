import {Component} from 'react'

import Cookies from 'js-cookie'
import Spinner from '../Spinner'
import Post from '../Post'
import './index.css'
import FailureView from '../FailureView'

const viewOptions = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomePagePosts extends Component {
  state = {
    activeView: viewOptions.loading,
    posts: [],
  }

  componentDidMount() {
    this.requestPostsApi()
  }

  handleSuccessApi = data => {
    const {posts} = data
    const updatedData = posts.map(eachPost => ({
      postId: eachPost.post_id,
      userId: eachPost.user_id,
      userName: eachPost.user_name,
      profilePic: eachPost.profile_pic,
      postDetails: eachPost.post_details,
      likesCount: eachPost.likes_count,
      comments: eachPost.comments,
      createdAt: eachPost.created_at,
    }))
    // console.log(updatedData)
    this.setState({posts: updatedData, activeView: viewOptions.success})
  }

  requestPostsApi = async () => {
    const api = `https://apis.ccbp.in/insta-share/posts`
    const accessToken = Cookies.get('jwt_token')
    //  console.log(accessToken)
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await fetch(api, option)
    // console.log('response')
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
      <FailureView apiRequest={this.requestPostsApi} />
    </div>
  )

  renderSuccessView = () => {
    const {posts} = this.state

    return (
      <div className="home-post-container">
        <ul className="home-page-post-list-container">
          {posts.map(eachItem => (
            <Post key={eachItem.postId} details={eachItem} />
          ))}
        </ul>
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
export default HomePagePosts
