import { lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import Home from 'pages/landing/Home'
import Services from 'pages/landing/Services'
import Search from 'pages/landing/Search'
import SignIn from 'pages/authentication/Login'

// project import
import Loadable from 'components/Loadable'
import {LandingLayout} from 'pages/landing/LandingLayout'

// Landing page route with navigation to login
const LandingRoutes = {
  path: '/',
  element: <LandingLayout />,
  children: [
    { path: '/', element: <Home /> },
    { path: 'services', element: <Services /> },
    { path: 'search', element: <Search /> },
    { path: 'signin', element: <SignIn /> },
  ]
}

export default LandingRoutes
