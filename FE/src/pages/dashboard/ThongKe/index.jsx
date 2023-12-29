import { Grid, Typography } from '@mui/material';
import TKDiemTK from './TKDiemTK';
import TKToanQuoc from './TKToanQuoc';
import TKDiemGD from './TKDiemGD/index';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h3">Thống kê</Typography>
        </Grid>

        {/* Thong ke toan quoc */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <TKToanQuoc />
        </Grid>

        {/* Thong ke diem giao dich */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <TKDiemGD />
        </Grid>

        {/* Thong ke diem tap ket */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <TKDiemTK />
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardDefault
