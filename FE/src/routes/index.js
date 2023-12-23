
import { createBrowserRouter, useRoutes } from 'react-router-dom'
import { LandingRoutes } from './LandingRoutes'

// ==============================|| ROUTING RENDER ||============================== //

export default function Router() {
  return useRoutes([LandingRoutes])
}