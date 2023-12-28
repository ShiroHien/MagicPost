import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import DashBoardRoutes from './DashBoardRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([DashBoardRoutes, LoginRoutes]);
}
