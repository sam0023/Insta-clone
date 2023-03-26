import {Link} from 'react-router-dom'
import notFound from '../../images/notFound.png'
import './index.css'

const NotFound = () => (
  <div className="not-found-bg">
    <img className="not-found-img" src={notFound} alt="page not found" />
    <h1 className="not-found-header">PAGE NOT FOUND</h1>
    <p className="not-found-msg">
      We are sorry, the page you requested could not be found.
    </p>
    <p className="not-found-msg">Please go back to homepage</p>
    <Link to="/" className="not-found-home-btn">
      Home Page
    </Link>
  </div>
)
export default NotFound
