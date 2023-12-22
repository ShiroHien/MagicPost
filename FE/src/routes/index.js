
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom'

// project import
import LoginRoutes from './LoginRoutes'
import MainRoutes from './MainRoutes'

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: LoginRoutes,
      children: [
        {
          index: true,
          element: LoginRoutes
        }
      ]
    },
    LoginRoutes,
    MainRoutes
  ],
  { basename: process.env.REACT_APP_BASE_NAME }
);

export default router