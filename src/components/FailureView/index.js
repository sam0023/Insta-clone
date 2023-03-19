import './index.css'

const FailureView = props => {
  const {apiRequest} = props

  const requestApi = () => {
    apiRequest()
  }

  return (
    <>
      <img src="" alt="failure view" />
      <p>Something went wrong. Please try again</p>

      <button type="button" onClick={requestApi()}>
        Try again
      </button>
    </>
  )
}

export default FailureView
