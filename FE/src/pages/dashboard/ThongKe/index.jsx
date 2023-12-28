import { useState } from 'react'

import { Grid, Stack, TextField, Typography } from '@mui/material'
import TKKhachGuiGD from './TKDiemGD/TKKhachGuiGD'
import TKDaGuiGD from './TKDiemGD/TKDaGuiGD'
import TKDiemTK from './TKDiemTK'
import TKToanQuoc from './TKToanQuoc'
import MainCard from '../../../components/MainCard'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import TKDiemGD from './TKDiemGD'

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
  const [activePage, setActivePage] = useState('TKToanQuoc')

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar>
        <Menu>
          <MenuItem onClick={() => setActivePage('TKToanQuoc')}>
            <NavLink to="/tktoanquoc">Thống kê toàn quốc</NavLink>
          </MenuItem>
          <MenuItem onClick={() => setActivePage('TKDiemGD')}>
            <NavLink to="/tkdiemgd">Thống kê hàng tại điểm giao dịch</NavLink>
          </MenuItem>
          <MenuItem onClick={() => setActivePage('TKDiemTK')}>
            <NavLink to="/tkdiemtk">Thống kê điểm tập kết</NavLink>
          </MenuItem>
        </Menu>
      </Sidebar>

      <Routes>
        <Route path="/tktoanquoc" element={<TKToanQuoc />} />
        {/* Define routes for other components */}
      </Routes>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h3">Thống kê</Typography>
        </Grid>

        {/* Thong ke toan quoc */}
        <TKToanQuoc/>

        {/* Thong ke diem giao dich */}
        <TKDiemGD/>

        {/* Thong ke diem tap ket */}
        <TKDiemTK />

      </Grid>
    </div>
  )
}

export default ThongKe
