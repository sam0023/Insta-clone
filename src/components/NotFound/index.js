import {Link} from 'react-router-dom'

const NotFound = () => (
  <div>
    <img src="" alt="page not found" />
    <h1>PAGE NOT FOUND</h1>
    <p>we are sorry, the page you requested could not be found</p>
    <Link to="/">
      <button type="button">Home Page</button>
    </Link>
  </div>
)
export default NotFound
