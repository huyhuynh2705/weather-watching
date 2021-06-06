import React from 'react'
import { hot } from 'react-hot-loader'
import { PrivateRoute, PublicRoute } from '@helpers'
import { Switch } from 'react-router-dom'
import Login from '@pages/login/index.js'
import ForgotPassword from '@pages/forgotpassword/index.js'
import Root from '@pages/root/index.js'
import Devices from '@pages/user/devices/index.js'
import Profile from '@pages/user/profile/index.js'
import UpdateProfile from '@pages/user/updateprofile/index.js'

function App() {
  return (
    <Switch>
      <PublicRoute path="/login" component={Login} />
      <PublicRoute path="/forgotpassword" component={ForgotPassword} />
      <PrivateRoute exact path="/" component={Root} />
      <PrivateRoute path="/devices" component={Devices} />
      <PrivateRoute path="/user" component={Profile} />
      <PrivateRoute path="/updateprofile" component={UpdateProfile} />
    </Switch>
  )
}

export default hot(module)(App)





// import React, { lazy } from 'react'
// import { hot } from 'react-hot-loader'
// import { PrivateRoute, PublicRoute } from '@helpers'
// import { Switch, Route } from 'react-router-dom'
// import { routes } from './routes'

// function App() {
//   return (
//     <Switch>
//       {
//         routes && routes.map((route, i) => {
//           const LazyComponent = lazy(() => {
//             return new Promise(resolve => {
//               setTimeout(() => resolve(import(`@pages/${route.component}/index.js`)), 500)
//             })
//           })
//           switch (route.status) {
//             case 'public':
//               return (
//                 <PublicRoute key={i} path={route.path} exact={route.exact}>
//                   <LazyComponent />
//                 </PublicRoute> 
//               )
//             case 'private':
//               return (
//                 <PrivateRoute key={i} path={route.path} exact={route.exact}>
//                   {/* <Layout {...route}> */}
//                   <LazyComponent {...route} />
//                   {/* </Layout> */}
//                 </PrivateRoute>
//               )
//             default:
//               return (
//                 <Route key={i} path={route.path} exact={route.exact}>
//                   <LazyComponent />
//                 </Route>
//               )
//           }
//         })
//       }
//     </Switch>
//   )
// }

// export default hot(module)(App)
