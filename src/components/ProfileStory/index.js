import './index.css'

const ProfileStory = props => {
  const {details, storyAlt} = props
  const {image} = details

  return (
    <li className="profile-status-bg ">
      <img className="profile-status" src={image} alt={storyAlt} />
    </li>
  )
}
export default ProfileStory
