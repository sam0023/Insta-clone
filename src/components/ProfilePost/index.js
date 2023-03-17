import './index.css'

const ProfilePost = props => {
  const {details, postAlt} = props
  const {image} = details

  return (
    <li className="profile-post-list">
      <img className="profile-post" src={image} alt={postAlt} />
    </li>
  )
}
export default ProfilePost
