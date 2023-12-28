import '../../assets/css/Menu.css'
import TraCuuMVD from '../../components/TraCuuMVD'
import UocTinhCuocPhi from '../../components/UocTinhCuocPhi'
import TimKiemBuuCuc from '../../components/TimKiemBuuCuc'

import { useState, useEffect, useRef } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { NavLink, Outlet } from 'react-router-dom'


const Search = () => {
  const [activePage, setActivePage] = useState('')

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar class='Siderbar'>
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
      </Sidebar>
      {(activePage == '') ? <TraCuuMVD /> : <Outlet />}
    </div>
  )
}

export default Search