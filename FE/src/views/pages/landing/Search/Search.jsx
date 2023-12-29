import UocTinhCuocPhi from '../../../../components/UocTinhCuocPhi'
import Navbar from '../../../../components/Navbars/Navbar'
import Footer from '../../../../components/Footer/Footer'
import Sidebar from './Sidebar/Sidebar'

import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'


const Search = () => {
  const [activePage, setActivePage] = useState('')
  // cần sửa thêm jwt và Cookie ở đây
  return (
    <>
      <div>
        <Navbar />
        <div className="bodyContainer">
          <Sidebar />
          <div className="others">
            <Outlet/>
          </div>
        </div>
        <Footer />
      </div>
    </>
    
  )
}

export default Search