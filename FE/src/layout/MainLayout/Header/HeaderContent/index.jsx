// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
import Profile from './Profile';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start', // Align items to the start
        alignItems: 'center',
        width: '100%',
      }}
    >
      {matchesXs && <Box sx={{ flexGrow: 1 }} />}
      <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push Profile to the right */}
      <Profile />
    </Box>
  );
};

export default HeaderContent;
