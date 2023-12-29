import { useRoutes } from 'react-router-dom'

// project import
import LandingRoutes from './LandingRoutes'
import LoginRoutes from './LoginRoutes'
import DashBoardRoutes from './DashBoardRoutes'

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([LandingRoutes, DashBoardRoutes, LoginRoutes])
}
