import { Box, Button, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import headerImg from '../assets/home-banner-image.png';

const Header = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
    paddingTop: theme.spacing(10),
    backgroundColor: 'white',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }
  }));

  const BoxText = styled(Box)(({ theme }) => ({
    flex: '1',
    paddingLeft: theme.spacing(20),
    [theme.breakpoints.down('md')]: {
      flex: '2',
      textAlign: 'center',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  }));

  return (
    <CustomBox component="header">
      {/*  Box text  */}
      <BoxText component="section">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            color: '#e03d3d',
            fontSize: '55px'
          }}
        >
          CÙNG HÀNG VIỆT <br /> ĐI KHẮP MUÔN NƠI
        </Typography>

        <Typography
          variant="p"
          component="p"
          sx={{
            fontSize: '23px',
            py: 3,
            lineHeight: 1.6,
            color: '#4c4c4c'
          }}
        >
          Với mong muốn đem đến cho khách hàng sự yên tâm và những trải nghiệm tuyệt vời nhất khi sử dụng dịch vụ chuyển phát. MagicPost luôn
          không ngừng thay đổi để ngày càng đáp ứng sự mong đợi của Khách hàng.
        </Typography>

        <Box>
          <Link to="/services" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              sx={{
                maxWidth: '100%',
                mr: 2,
                px: 4,
                py: 1,
                fontSize: '0.9rem',
                textTransform: 'capitalize',
                borderRadius: 5,
                borderColor: '#14192d',
                color: '#fff',
                backgroundColor: '#e03d3d',
                '&&:hover': {
                  backgroundColor: '#343a55'
                },
                '&&:focus': {
                  backgroundColor: '#343a55'
                }
              }}
            >
              Tiếp tục
              <ArrowForwardIcon sx={{ ml: 1, fontSize: '24px' }} />
            </Button>
          </Link>
        </Box>
      </BoxText>

      <Box
        sx={(theme) => ({
          display: 'flex', // Add display flex
          justifyContent: 'center', // Center content horizontally
          alignItems: 'start',
          [theme.breakpoints.down('md')]: {
            flex: '1',
            paddingTop: '30px',
            alignSelf: 'center'
          },
          [theme.breakpoints.up('md')]: {
            flex: '2'
          }
        })}
      >
        <img
          src={headerImg}
          alt="headerImg"
          style={{
            width: '40%'
          }}
        />
      </Box>
    </CustomBox>
  );
};

export default Header;
