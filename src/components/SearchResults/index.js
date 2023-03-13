import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Post from '../Post'

const viewOptions = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchResults extends Component {
  state = {
    posts: [],
    activeView: viewOptions.initial,
  }

  componentDidMount() {
    this.requestSearchPostApi()
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
    this.setState({posts: updatedData, activeView: viewOptions.success})
  }

  handleFailureApi = () => {
    this.setState({activeView: viewOptions.failure})
  }

  requestSearchPostApi = async () => {
    const {search} = this.props
    this.setState({activeView: viewOptions.loading})

    const api = `https://apis.ccbp.in/insta-share/posts?search=${search}`

    const accessToken = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const response = await fetch(api, option)
    console.log(response)
    const data = await response.json()
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
      <button type="button" onClick={this.requestSearchPostApi}>
        Try again
      </button>
    </div>
  )

  renderPosts = () => {
    const {posts} = this.state
    if (posts.length === 0) {
      return (
        <div>
          <img src="" alt="search not found" />
          <h1>Search Not Found</h1>
          <p>Try different keyword or search again</p>
        </div>
      )
    }
    return (
      <div>
        {posts.map(eachItem => (
          <Post key={eachItem.postId} details={eachItem} />
        ))}
      </div>
    )
  }

  renderSuccessView = () => (
    <div>
      <h1>Search Results</h1>
      {this.renderPosts()}
    </div>
  )

  renderFinalView = () => {
    const {activeView} = this.state
    console.log(activeView)
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
export default SearchResults
