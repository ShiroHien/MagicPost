import { useState, useEffect, useRef } from 'react'

import { Grid, Stack, TextField, Typography } from '@mui/material'
import TKKhachGuiGD from './TKDiemGD/TKKhachGuiGD'
import TKDaGuiGD from './TKDiemGD/TKDaGuiGD'
import TKDiemTK from './TKDiemTK'
import TKToanQuoc from './TKToanQuoc'
import MainCard from '../../../components/MainCard'

import axiosInstance from '../../../utils/AxiosInstance'

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
  // const [value, setValue] = useState('today')
  {/* tổng đơn - sửa số liệu here */}
  const [totalTQ, setTotalTQ] = useState()
  const [totalTK, setTotalTK] = useState()

  const [province, setProvince] = useState('Hà Nội')
  const [district, setDistrict] = useState('Đống Đa')

  useEffect(() => {
    getDataForFilterTQ()
  }, [])
  // Gọi API thống kê tổng đơn toàn quốc trong năm
  const getDataForFilterTQ = async () => {
    let response = await axiosInstance({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `http://localhost:3377/v1/postal-goods/statisticsTQ/`,
      data: {
        statisticType: 'total',
        filterType: 'monthOfYear',
        filterValue: 2023
      }
    })
    setTotalTQ(response.data[0].count)
  }

  useEffect(() => {
    getDataForFilterTK()
  }, [province, district])
  // Gọi API để lấy warehouseId từ province vs district
  // const getIdByFilter = async () => {
  //   let response = await axiosInstance({
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     method: 'post',
  //     url: `http://localhost:3377/v1/warehouse-points/findid`,
  //     data: {
  //       province: province,
  //       city: district
  //     }
  //   })
  //   setId(response.data._id)
  // }
  // Gọi API thống kê tổng đơn tập kết trong tuần
  const getDataForFilterTK = async () => {
    let response = await axiosInstance({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `http://localhost:3377/v1/postal-goods/statisticsTK`,
      data: {
        province: province,
        city: district,
        statisticType: 'total',
        filterType: 'dayOfWeek',
        filterValue: 2023 // hiện tại dang để tuần hiện tại nào có filter thì thay sau
      }
    })
    setTotalTK(response.data.count)
  }

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
