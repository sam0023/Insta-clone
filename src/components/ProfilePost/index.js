const ProfilePost = props => {
  const {details, postAlt} = props
  const {image} = details

  return (
    <li>
      <img src={image} alt={postAlt} />
    </li>
  )
}
export default ProfilePost
