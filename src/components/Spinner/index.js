import Loader from 'react-loader-spinner'
import './index.css'

const Spinner = () => (
  <Loader
    className="loader"
    type="TailSpin"
    color="#4094EF"
    ariaLabel="blocks-loading"
    wrapperStyle={{}}
    wrapperClass="blocks-wrapper"
    height="50"
    width="50"
    ringWidth="20"
  />
  //   <Loader
  //     height="80"
  //     width="80"
  //     ariaLabel="blocks-loading"
  //     wrapperStyle={{}}
  //     wrapperClass="blocks-wrapper"
  //     colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  //   />
)
export default Spinner
