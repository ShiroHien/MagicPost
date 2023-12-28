import Home from '../pages/Landing/Home'
import Services from '../pages/Landing/Services'
import Search from '../pages/Landing/Search'
import SignIn from '../pages/Auth/Login'
import { LandingLayout } from '../pages/Landing/LandingLayout'

import { createBrowserRouter } from 'react-router-dom'
import ThongKe from '../pages/dashboard/ThongKe'
import TKToanQuoc from '../pages/dashboard/ThongKe/TKToanQuoc'
import TKDiemTK from '../pages/dashboard/ThongKe/TKDiemTK'
import TKDiemGD from '../pages/dashboard/ThongKe/TKDiemGD'
import UocTinhCuocPhi from '../components/UocTinhCuocPhi'
import TraCuuMVD from '../components/TraCuuMVD'
import TimKiemBuuCuc from '../components/TimKiemBuuCuc'

export const RootRoutes = createBrowserRouter([
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
        element: <Search />,
        children: [
          {
            path: '/search/mvd',
            element: <TraCuuMVD/>
          },
          {
            path: '/search/cuocphi',
            element: <UocTinhCuocPhi/>
          },
          {
            path: '/search/buucuc',
            element:  <TimKiemBuuCuc />
          }
        ]
      },
      {
        path: '/signin',
        element: <SignIn />
      }
    ]
  },
  {
    path: '/statistics',
    element: <ThongKe />,
    children: [
      {
        path: '/statistics/tktoanquoc',
        element: <TKToanQuoc/>
      },
      {
        path: '/statistics/tkdiemgd',
        element: <TKDiemGD/>
      },
      {
        path: '/statistics/tkdiemtk',
        element:  <TKDiemTK />
      }
    ]
  }

]
)
