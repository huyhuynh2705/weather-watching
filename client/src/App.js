import React from 'react'
import { hot } from 'react-hot-loader'
import { PrivateRoute, PublicRoute } from '@helpers'
import { Switch } from 'react-router-dom'
import Login from '@pages/login/index.js'
import Admin from '@pages/adminroot/index.js'
import UserHome from '@pages/root/index.js'
import Devices from '@pages/root/devices/index.js'
import User from '@pages/root/user/index.js'
import UpdateProfile from '@pages/root/updateprofile/index.js'

function App() {
  return (
    <Switch>
      <PublicRoute path="/login" component={Login} />
      <PrivateRoute exact path="/admin" component={Admin} />
      <PrivateRoute exact path="/" component={UserHome} />
      <PrivateRoute path="/devices" component={Devices} />
      <PrivateRoute path="/user" component={User} />
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
