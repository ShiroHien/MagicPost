import Home from '../pages/Landing/Home';
import Services from '../pages/Landing/Services';
import Search from '../pages/Landing/Search';
import SignIn from '../pages/Auth/Login';
import { LandingLayout } from '../pages/Landing/LandingLayout';

import { createBrowserRouter } from 'react-router-dom';
import ThongKe from '../pages/dashboard/ThongKe';
import AdminDashboard from '../pages/roles/admin/AdminDashboard';
import ManageTransaction from '../pages/roles/admin/ManageTransaction';
import ManageWarehouse from '../pages/roles/admin/ManageWarehouse';
import Account from '../pages/roles/admin/Account';
import Statistics from '../pages/roles/admin/Statistics';

// const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard')));

export const RootRoutes = createBrowserRouter([
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/services',
        element: <Services />,
      },

      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
    ],
  },
  {
    path: '/statistics',
    element: <ThongKe />,
    children: [],
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
    children: [
      {
        path: 'manageTransaction',
        element: <ManageTransaction />,
      },
      {
        path: 'manageWarehouse',
        element: <ManageWarehouse />,
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'statistics',
        element: <Statistics />,
      },
    ],
  },
]);
