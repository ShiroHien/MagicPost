import React from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  Typography,
  styled,
  ListItemButton,
  ListItemText
} from '@mui/material'
// menu
import DrawerItem from './DrawerItem'
// rotas
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'


// personalizacao
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
        padding: '20px 130px',
        marginRight: '5rem'
      }}
      elevation={0}
    >
      <StyledToolbar>
        <Box>
          <img src={Logo} alt="" width={'80px'}/>
        </Box>
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
                      textAlign: 'center'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}

        </ListMenu>
      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar
