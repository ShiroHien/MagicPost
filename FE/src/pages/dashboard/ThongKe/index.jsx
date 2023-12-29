import '../../../assets/css/Menu.css'

import { useState, useEffect, useRef } from 'react'
import { Grid, Stack, TextField, Typography } from '@mui/material'

import TKToanQuoc from './TKToanQuoc'
import MainCard from '../../../components/MainCard'

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { BrowserRouter as Router, Routes, Route, NavLink, Outlet } from 'react-router-dom'
import { inline } from '@floating-ui/core'


// sales report status
// const status = [
//   {
//     value: 'today',
//     label: 'Today'
//   },
//   {
//     value: 'month',
//     label: 'This Month'
//   },
//   {
//     value: 'year',
//     label: 'This Year'
//   }
// ]

// ==============================|| Thong ke||============================== //

const ThongKe = () => {
  // const [value, setValue] = useState('today')
  const [activePage, setActivePage] = useState('')

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'row'}}>
      <Sidebar>
        <Menu class='Menu'>
          <MenuItem class='MenuItem' onClick={() => setActivePage('TKToanQuoc')}>
            <NavLink class='NavLink' to="/statistics/tktoanquoc">Thống kê toàn quốc</NavLink>
          </MenuItem>
          <MenuItem class='MenuItem' onClick={() => setActivePage('TKDiemGD')}>
            <NavLink class='NavLink' to="/statistics/tkdiemgd">Thống kê hàng tại điểm giao dịch</NavLink>
          </MenuItem>
          <MenuItem class='MenuItem' onClick={() => setActivePage('TKDiemTK')}>
            <NavLink class='NavLink' to="/statistics/tkdiemtk">Thống kê điểm tập kết</NavLink>
          </MenuItem>
        </Menu>
      </Sidebar>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', margin: '0' }}>
        {(activePage === '') ? <TKToanQuoc/> : <Outlet />}
      </div>
    </div>
  )
}

export default ThongKe
