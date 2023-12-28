import { useState, useEffect, useRef } from 'react'

import { Grid, MenuItem, Stack, TextField, Typography } from '@mui/material'
import TKKhachGuiGD from './TKKhachGuiGD'
import TKDaGuiGD from './TKDaGuiGD'
import TKDiemTK from './TKDiemTK'
import TKToanQuoc from './TKToanQuoc'
import MainCard from '../../../components/MainCard'

import axiosInstance from '../../../utils/AxiosInstance'


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


  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h3">Thống kê</Typography>
      </Grid>

      {/* Thong ke toan quoc */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Thống kê toàn quốc</Typography>
          </Grid>
          {/* <Grid item>
            <TextField
              id="standard-select-currency"
              size="small"
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid> */}
        </Grid>
        <MainCard sx={{ mt: 1.75 }}>
          <Stack spacing={1.5} sx={{ mb: -12 }}>
            <Typography variant="h6" color="secondary">
              Tổng đơn
            </Typography>
            
            <Typography variant="h4">{totalTQ}</Typography>
          </Stack>
          <TKToanQuoc />
        </MainCard>
      </Grid>

      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h4">Thống kê hàng tại điểm giao dịch</Typography>
      </Grid>
      {/* thong ke diem giao dich: khach gui */}
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Thống kê hàng khách gửi</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <TKKhachGuiGD />
        </MainCard>
      </Grid>

      {/* thong ke diem giao dich: da gui */}
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Thống kê hàng đã gửi</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <TKDaGuiGD />
        </MainCard>
      </Grid>

      {/* Thong ke diem tap ket */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Thống kê điểm tập kết</Typography>
          </Grid>
          {/* <Grid item>
            <TextField
              id="standard-select-currency"
              size="small"
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid> */}
        </Grid>
        <MainCard sx={{ mt: 1.75 }}>
          <Stack spacing={1.5} sx={{ mb: -12 }}>
            <Typography variant="h6" color="secondary">
              Tổng đơn
            </Typography>
            <Typography variant="h4">{totalTK}</Typography>
          </Stack>
          <TKDiemTK />
        </MainCard>
      </Grid>

    </Grid>
  )
}

export default ThongKe
