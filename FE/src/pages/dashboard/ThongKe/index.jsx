import { useState } from 'react'

import { Grid, MenuItem, Stack, TextField, Typography } from '@mui/material'
import TKKhachGuiGD from './TKKhachGuiGD'
import TKDaGuiGD from './TKDaGuiGD'
import TKDiemTK from './TKDiemTK'
import TKToanQuoc from './TKToanQuoc'
import MainCard from '../../../components/MainCard'
// sales report status
const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
]

// ==============================|| Thong ke||============================== //

const ThongKe = () => {
  const [value, setValue] = useState('today')

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
          <Grid item>
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
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 1.75 }}>
          <Stack spacing={1.5} sx={{ mb: -12 }}>
            <Typography variant="h6" color="secondary">
              Tổng đơn
            </Typography>
            {/* tổng đơn - sửa số liệu here */}
            <Typography variant="h4">1000</Typography>
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
          <Grid item>
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
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 1.75 }}>
          <Stack spacing={1.5} sx={{ mb: -12 }}>
            <Typography variant="h6" color="secondary">
              Tổng đơn
            </Typography>
            <Typography variant="h4">500</Typography>
          </Stack>
          <TKDiemTK />
        </MainCard>
      </Grid>

    </Grid>
  )
}

export default ThongKe
