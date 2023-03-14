import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import './index.css'

class Post extends Component {
  state = {
    likeStatus: false,
  }

  requestPostLikeApi = async () => {
    const {likeStatus} = this.state
    const {details} = this.props
    const {postId} = details

    const accessToken = Cookies.get('jwt_token')
    const body = {
      like_status: !likeStatus,
    }
    const option = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    console.log(body)
    const api = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const response = await fetch(api, option)
    console.log(`like response`)
    console.log(response)
    if (response.ok) {
      this.updateLikeBtn()
      console.log('liked')
    }
  }

  updateLikeBtn = () => {
    this.setState(prev => ({
      likeStatus: !prev.likeStatus,
    }))
  }

  render() {
    const {likeStatus} = this.state
    const {details} = this.props

    const {
      userId,
      userName,
      profilePic,
      postDetails,
      likesCount,
      comments,
      createdAt,
    } = details
    const totalLikes = likeStatus ? likesCount + 1 : likesCount
    const likeIcon = likeStatus ? (
      <FcLike onClick={this.requestPostLikeApi} data-testid="unLikeIcon" />
    ) : (
      <BsHeart onClick={this.requestPostLikeApi} data-testid="likeIcon" />
    )
    return (
      <li>
        <div>
          <img src={profilePic} alt="post author profile" />
          <Link to={`/users/${userId}`}>
            <h1>{userName}</h1>
          </Link>
        </div>
        <img src={postDetails.image_url} alt="post" />
        <div>
          {likeIcon}

          <FaRegComment />
          <BiShareAlt />
        </div>
        <p>{totalLikes} likes</p>
        <p>{postDetails.caption}</p>
        <ul>
          {comments.map(eachItem => (
            <li key={eachItem.user_name}>
              <span>{eachItem.user_name}</span>
              <p>{eachItem.comment}</p>
            </li>
          ))}
        </ul>
        <p>{createdAt}</p>
      </li>
    )
  }
}
export default Post
