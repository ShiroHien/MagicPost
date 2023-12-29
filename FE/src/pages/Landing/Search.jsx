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
            <NavLink to="/search/mvd">Tra cứu mã vận đơn</NavLink>
          </MenuItem>
          <MenuItem class='MenuItem' onClick={() => setActivePage('2')}>
            <NavLink to="/search/cuocphi">Ước tính cước phí</NavLink>
          </MenuItem>
          <MenuItem class='MenuItem' onClick={() => setActivePage('3')}>
            <NavLink to="/search/buucuc">Tìm kiếm bưu cục</NavLink>
          </MenuItem>
        </Menu>
      </Sidebar>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', margin: '0' }}>
        {(activePage == '') ? <TraCuuMVD /> : <Outlet />}
      </div>
    </div>
  )
}

export default Search