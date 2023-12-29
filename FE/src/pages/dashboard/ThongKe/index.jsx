import { useContext } from 'react'
import { Grid, Typography } from '@mui/material'
import AuthContext from 'context/AuthProvider'
import TKDiemTK from './TKDiemTK'
import TKToanQuoc from './TKToanQuoc'
import TKDiemGD from './TKDiemGD/index'

const DashboardDefault = () => {
  const { auth } = useContext(AuthContext)

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h3">Thống kê</Typography>
        </Grid>

        {/* Thong ke toan quoc - Available for CEO */}
        {['ceo'].includes(auth.role) && (
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <TKToanQuoc />
          </Grid>
        )}

        {/* Thong ke diem giao dich - Only for tdgd and nvgd */}
        {['tdgd', 'nvgd', 'ceo'].includes(auth.role) && (
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <TKDiemGD />
          </Grid>
        )}

        {/* Thong ke diem tap ket - Only for tdtk and nvtk */}
        {['nvtk', 'tdtk', 'ceo'].includes(auth.role) && (
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <TKDiemTK />
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default DashboardDefault
