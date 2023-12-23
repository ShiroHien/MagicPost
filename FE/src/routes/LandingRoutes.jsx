import Home from '../pages/Landing/Home'
import Services from '../pages/Landing/Services'
import Search from '../pages/Landing/Search'
import SignIn from '../pages/Auth/Login'
import { LandingLayout } from '../pages/Landing/LandingLayout'

import { createBrowserRouter } from 'react-router-dom'

// const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard')));

export const LandingRoutes = createBrowserRouter([
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path:'/services',
        element: <Services />
      },

      {
        path: '/search',
        element: <Search />
      }
    //   {
    //     path: '/signin',
    //     element: <SignIn />
    //   }
    ]
  },
  {
    path: '/signin',
    element: <SignIn />,
    // path: '/dashboard',
    // element: <DashboardDefault />,
    children: [
    ]
  }

]
)