import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import ProfileStory from '../ProfileStory'
import ProfilePost from '../ProfilePost'
import './index.css'

const CommonProfile = props => {
  const {details, profileAlt, storyAlt, postAlt} = props
  const {stories, posts} = details

  const renderPostsSection = () => {
    if (posts.length === 0) {
      return (
        <div className="no-post-bg">
          <div className="cam-bg">
            <BiCamera className="cam" />
          </div>
          <h1 className="cam-msg">No Posts</h1>
        </div>
      )
    }
    return (
      <div className="profile-posts-bg">
        <ul className="profile-posts-container">
          {posts.map(eachItem => (
            <ProfilePost
              key={eachItem.id}
              details={eachItem}
              postAlt={postAlt}
            />
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-data-container-sm">
        <p className="profile-name-sm">{details.user_name}</p>
        <div className="profile-data-container">
          <img
            src={details.profile_pic}
            alt={profileAlt}
            className="profile-img"
          />
          <div className="profile-details-container">
            <p className="profile-name">{details.user_name}</p>
            <ul className="profile-stats-container">
              <li className="stats-list">
                <span className="stat">{details.posts_count}</span>
                <p className="stat-title">posts</p>
              </li>
              <li className="stats-list">
                <span className="stat">{details.followers_count}</span>

                <p className="stat-title">followers</p>
              </li>
              <li className="stats-list-last">
                <span className="stat">{details.following_count}</span>

                <p className="stat-title">following</p>
              </li>
            </ul>
            <p className="user-name">{details.user_id}</p>
            <p className="profile-bio">{details.user_bio}</p>
          </div>
        </div>
        <p className="user-name-sm">{details.user_id}</p>
        <p className="profile-bio-sm">{details.user_bio}</p>

        <ul className="profile-status-container">
          {stories.map(eachItem => (
            <ProfileStory
              key={eachItem.id}
              details={eachItem}
              storyAlt={storyAlt}
            />
          ))}
        </ul>
      </div>
      <span>
        <hr className="profile-hr-line" />
      </span>
      <div className="profile-post-section-bg">
        <div className="profile-grid-container">
          <BsGrid3X3 className="grid" />
          <h1 className="grid-title">Posts</h1>
        </div>
        {renderPostsSection()}
      </div>
    </div>
  )
}

export default CommonProfile
