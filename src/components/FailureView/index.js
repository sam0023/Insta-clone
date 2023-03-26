import alertTriangle from '../../images/alertTriangle.png'
import './index.css'

const FailureView = props => {
  const {apiRequest} = props

  const requestApi = () => {
    apiRequest()
  }

  return (
    <>
      <img src={alertTriangle} alt="failure view" />
      <p className="fail-msg">Something went wrong. Please try again</p>

      <button type="button" className="fail-retry-btn" onClick={requestApi()}>
        Try again
      </button>
    </>
  )
}

export default FailureView
