// import UocTinhCuocPhi from '../../../../components/UocTinhCuocPhi'
// import TimKiemDgd from './TimKiemDgd'
// import Navbar from '../../../../components/Navbars/Navbar'
// import Footer from '../../../../components/Footer/Footer'
import Sidebar from './Sidebar/Sidebar'

import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'


const Search = () => {
  const [activePage, setActivePage] = useState('')

  return (
    <>
      <div>
        {/* <Sidebar class='Siderbar'>
          <Menu class='Menu'>
            <MenuItem class='MenuItem' onClick={() => setActivePage('1')}>
              <NavLink class='NavLink' to="/search/mvd">Tra cứu mã vận đơn</NavLink>
            </MenuItem>
            <MenuItem class='MenuItem' onClick={() => setActivePage('2')}>
              <NavLink class='NavLink' to="/search/cuocphi">Ước Tính cước phí</NavLink>
            </MenuItem>
            <MenuItem class='MenuItem' onClick={() => setActivePage('3')}>
              <NavLink class='NavLink' to="/search/buucuc">Tìm kiếm bưu cục</NavLink>
            </MenuItem>
          </Menu>
        </Sidebar> */}
        {/* {(activePage == '') ? <TraCuuMVD /> : <Outlet />} */}
        <div className="bodyContainer">
          <Sidebar />
          <div className="others">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default Search