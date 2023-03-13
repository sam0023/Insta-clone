// import Cookies from 'js-cookie'
// import {Route, Redirect} from 'react-router-dom'

// const ProtectedRoute = props => {
//   const accessToken = Cookies.get('jwtToken')

//   if (accessToken === undefined) {
//     console.log('i am in undefined token')
//     return <Redirect to="/login" />
//   }

//   return <Route {...props} />
// }
// export default ProtectedRoute

import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = props => {
  const accessToken = Cookies.get('jwt_token')

  if (accessToken === undefined) {
    console.log('i am in undefined token')
    return <Redirect to="/login" />
  }

  return <Route {...props} />
}
export default ProtectedRoute
