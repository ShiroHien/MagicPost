import React from 'react'
import {
  Box,
  Stack,
  styled,
  Typography
} from '@mui/material'
import Link from '@mui/material/Link'
import FooterTitle from './FooterTitle'
import FooterLink from './FooterLink'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

const Footer = () => {

  const StackColumn = styled(Stack) (() => ({
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    gap: 8,
    textAlign: 'center'
  }))

  const BoxRow = styled(Box) (({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ededed',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: 30
    }
  }))

  return (

    <BoxRow
      component = 'footer'
      sx={{
        py: 4,
        px: 2
      }}
    >
      <StackColumn>
        <FooterTitle text={'Liên hệ'} />
        <FooterLink
          text={'0912222222'}
        />
        <FooterLink
          text={'magicpost@gmail.com'}
        />
        <FooterLink
          text={'contact@gmail.com'}
        />
      </StackColumn>

      <StackColumn>
        <FooterTitle text={'Dịch vụ'} />
        <FooterLink text={'Dịch Vụ Trong Nước'} />
        <FooterLink text={'Dịch Vụ Quốc Tế'} />
        <FooterLink text={'Thương Mại Điện Tử'} />
        <FooterLink text={'Quản Lý Chất Lượng'} />
      </StackColumn>

      <StackColumn>
        <FooterTitle text={'MagicPost'} />
        <Stack
          direction='row'
          width= '70px'
          maxWidth='100%'
          justifyContent='space-between'
        >
          <Link href="#" variant="body2"
            sx={{
              color: '#414141',
              '&:hover': {
                color: '#1c2859'
              }
            }}
          >
            <InstagramIcon />
          </Link>
          <Link href="#"variant="body2"
            sx={{
              color: '#414141',
              '&:hover': {
                color: '#1c2859'
              }
            }}
          >
            <FacebookIcon />
          </Link>
        </Stack>
        <Typography
          variant='caption'
          component='p'
        >
          &copy; 2023 MagicPost Inc.
        </Typography>
      </StackColumn>
    </BoxRow>
  )
}

export default Footer