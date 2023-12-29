import PropTypes from 'prop-types'

// material-ui
import { Box, Grid } from '@mui/material'

// project import
import AuthCard from './AuthCard'
import Logo from 'components/Logo'
// assets
import AuthBackground from 'assets/images/auth/AuthBackground'

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
  <Box sx={{ minHeight: '80vh' }}>
    <AuthBackground />
    <Grid
      container
      direction="column"
      justifyContent="center"
      sx={{
        minHeight: '80vh'
      }}
    >
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"

        >
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
)

AuthWrapper.propTypes = {
  children: PropTypes.node
}

export default AuthWrapper
