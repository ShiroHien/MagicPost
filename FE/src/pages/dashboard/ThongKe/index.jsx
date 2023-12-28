import { useState, useEffect, useRef } from 'react'
import { Grid, Stack, TextField, Typography } from '@mui/material'

import TKToanQuoc from './TKToanQuoc'
import MainCard from '../../../components/MainCard'

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { BrowserRouter as Router, Routes, Route, NavLink, Outlet } from 'react-router-dom'


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
  const [activePage, setActivePage] = useState('TKToanQuoc')

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar>
        <Menu>
          <MenuItem onClick={() => setActivePage('TKToanQuoc')}>
            <NavLink to="/statistics/tktoanquoc">Thống kê toàn quốc</NavLink>
          </MenuItem>
          <MenuItem onClick={() => setActivePage('TKDiemGD')}>
            <NavLink to="/statistics/tkdiemgd">Thống kê hàng tại điểm giao dịch</NavLink>
          </MenuItem>
          <MenuItem onClick={() => setActivePage('TKDiemTK')}>
            <NavLink to="/statistics/tkdiemtk">Thống kê điểm tập kết</NavLink>
          </MenuItem>
        </Menu>
      </Sidebar>

      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h3">Thống kê</Typography>
        </Grid>
        <Outlet />
      </Grid>
    </div>
  )
}

export default ThongKe
