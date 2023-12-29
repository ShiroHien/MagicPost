import React from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  Typography,
  styled,
  Button,
  ListItemButton,
  ListItemText
} from '@mui/material'
// menu
import DrawerItem from '../DrawerItem'
// rotas
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png' 

const StyledToolbar = styled(Toolbar) ({
  display: 'flex',
  justifyContent: 'space-between'
})

const ListMenu = styled(List)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')] : {
    display: 'flex'
  }
}))

//rotas
const itemList = [
  {
    text: 'Trang chủ',
    to: '/'
  },
  {
    text: 'Dịch vụ',
    to: '/services'
  },
  {
    text: 'Tra cứu',
    to: '/search'
  }
]


const Navbar = () => {

  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{
        backgroundColor: 'white',
        padding: '0px 130px',
        marginRight: '5rem'
      }}
      elevation={0}
    >
      <StyledToolbar>
        <Link to="/">
          <img src={Logo} alt="" width={'80px'}/>
        </Link>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <DrawerItem />
        </Box>
        <ListMenu sx={{ width: '100%', gap: '0px', maxWidth: 450 }}>
          {itemList.map( ( item ) => {
            const { text } = item
            return (
              <ListItem key={text} sx={{ alignContent: 'center' }}>
                <ListItemButton component={Link} to={item.to}
                  sx={{
                    color: '#000000',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#ff3333'
                    }
                  }}
                >
                  <ListItemText primary={text}
                    primaryTypographyProps={{
                      textAlign: 'center',
                      fontSize: '18px'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </ListMenu>

        <Link to="/signin">
          <Button
          // component={Link}
          // to=""
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
              color: 'white',
              backgroundColor: '#f54949',
              '&&:hover': {
                backgroundColor: '#343a55'
              },
              '&&:focus': {
                backgroundColor: '#343a55'
              }
            }}
          >
          Đăng nhập
          </Button>
        </Link>

      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar
