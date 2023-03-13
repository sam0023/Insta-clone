const ProfileStory = props => {
  const {details, storyAlt} = props
  const {image} = details

  return (
    <li>
      <img src={image} alt={storyAlt} />
    </li>
  )
}
export default ProfileStory
