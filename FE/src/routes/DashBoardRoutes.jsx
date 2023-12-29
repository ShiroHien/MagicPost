import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/ThongKe')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/main',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      element: <DashboardDefault />
    }
  ]
};

export default MainRoutes;
