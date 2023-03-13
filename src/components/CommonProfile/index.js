import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import ProfileStory from '../ProfileStory'
import ProfilePost from '../ProfilePost'

const CommonProfile = props => {
  const {details, profileAlt, storyAlt, postAlt} = props
  const {stories, posts} = details

  const renderPostsSection = () => {
    if (posts.length === 0) {
      return (
        <div>
          <BiCamera />
          <h1>No Posts</h1>
        </div>
      )
    }
    return (
      <div>
        <ul>
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
    <div>
      <div>
        <img src={details.profile_pic} alt={profileAlt} />
        <div>
          <h1>{details.user_name}</h1>
          <ul>
            <li>
              {details.posts_count}
              <p>Posts</p>
            </li>
            <li>
              {details.followers_count}
              <p>followers</p>
            </li>
            <li>
              {details.following_count}
              <p>following</p>
            </li>
          </ul>
          <p>{details.user_id}</p>
          <p>{details.user_bio}</p>
        </div>
      </div>
      <ul>
        {stories.map(eachItem => (
          <ProfileStory
            key={eachItem.id}
            details={eachItem}
            storyAlt={storyAlt}
          />
        ))}
      </ul>
      <hr />
      <div>
        <div>
          <BsGrid3X3 />
          <h1>Posts</h1>
        </div>
        {renderPostsSection()}
      </div>
    </div>
  )
}

export default CommonProfile
