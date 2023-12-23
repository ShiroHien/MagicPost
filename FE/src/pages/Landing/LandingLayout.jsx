import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer/Footer'

export const LandingLayout = () => (
  <>
    <Navbar />

    <Outlet />

    <Footer />
  </>
)

