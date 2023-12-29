import TKKhachGuiGD from './TKKhachGuiGD'
import TKDaGuiGD from './TKDaGuiGD'
import { Grid, Stack, TextField, Typography } from '@mui/material'

const TKDiemGD = () => {
  return (
    <>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography sx={{
        width: '70%',
        height: 'auto',
        margin: '0px auto',
        padding: '10px',
        marginBottom: '30px'
      }} variant="h4">Thống kê hàng tại điểm giao dịch</Typography>
        <TKKhachGuiGD />
        <TKDaGuiGD />
      </Grid>
    </>
  )
}

export default TKDiemGD
