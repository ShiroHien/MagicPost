import PropTypes from 'prop-types'

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material'

// project import
import MainCard from '../../../components/MainCard'


// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ title, count, icon: Icon }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.2}>
      <Typography variant="h8" color="textSecondary">
        {title}
      </Typography>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Box sx={{ pt: 0 }}>
            {Icon ? <Icon /> : null}
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="h4" color="inherit">
            {count}
          </Typography>
        </Grid>
      </Grid>
    </Stack>

  </MainCard>
)

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
}


export default AnalyticEcommerce

