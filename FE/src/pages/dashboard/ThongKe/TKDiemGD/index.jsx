import TKKhachGuiGD from './TKKhachGuiGD'
import TKDaGuiGD from './TKDaGuiGD'
import { Grid, Stack, TextField, Typography } from '@mui/material'

const TKDiemGD = () => {
  return (
    <>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h4">Thống kê hàng tại điểm giao dịch</Typography>
      </Grid>
      <TKKhachGuiGD />
      <TKDaGuiGD />
    </>
  )
}

export default TKDiemGD
