import {useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import HeaderContext from '../../context/HeaderContext'
import './index.css'

const Post = props => {
  const [likeStatus, setLikeStatus] = useState(false)

  const {details} = props

  const {
    userId,
    userName,
    profilePic,
    postDetails,
    likesCount,
    comments,
    createdAt,
  } = details

  const requestPostLikeApi = async () => {
    setLikeStatus(!likeStatus)
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

    const api = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const response = await fetch(api, option)

    if (!response.ok) {
      setLikeStatus(!likeStatus)
    }
  }

  const totalLikes = likeStatus ? likesCount + 1 : likesCount
  const likeIcon = likeStatus ? (
    <FcLike
      onClick={requestPostLikeApi}
      data-testid="unLikeIcon"
      className="like-icon"
    />
  ) : (
    <BsHeart
      onClick={requestPostLikeApi}
      data-testid="likeIcon"
      className="like-icon"
    />
  )
  return (
    <HeaderContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const postTheme = isDarkTheme ? 'post-dark-theme' : 'post-light-theme'
        const postProfileTheme = isDarkTheme
          ? 'post-profile-dark-theme'
          : 'post-profile-light-theme'
        return (
          <li className={`post-container ${postTheme}`}>
            <div className="post-profile-section">
              <Link to={`/users/${userId}`} className="post-link">
                <div className="post-profile-img-container">
                  <img
                    src={profilePic}
                    alt="post author profile"
                    className="post-author-img"
                  />
                </div>

                <h1 className={`p ${postProfileTheme}`}>{userName}</h1>
              </Link>
            </div>
            <div className="post-img-container ">
              <img
                src={postDetails.image_url}
                alt="post"
                className="post-img"
              />
            </div>
            <div className="post-footer">
              <div className="icons-container">
                {likeIcon}

                <FaRegComment className="comment-icon" />
                <BiShareAlt className="share-icon" />
              </div>
              <p className="likes-count">{totalLikes} likes</p>
              <p className="caption-text">{postDetails.caption}</p>
              <ul className="comment-section">
                {comments.map(eachItem => (
                  <li key={eachItem.user_name} className="comment-list">
                    <span className="comment-author">
                      {eachItem.user_name}{' '}
                    </span>
                    <p className="comment">{eachItem.comment}</p>
                  </li>
                ))}
              </ul>
              <p className="post-time">{createdAt}</p>
            </div>
          </li>
        )
      }}
    </HeaderContext.Consumer>
  )
}

export default Post
