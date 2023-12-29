import React from 'react'
import {
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent
} from '@mui/material'
// icons
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined'
// components
import Title from './Title'
import Paragraph from './Paragraph'


const Content = () => {
  return (
    <Grid container spacing={0}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        py: 10,
        px: 2,

        minHeight: '80vh'

      }}
    >
      <Grid item xs={12} sm={12} md={4} component = 'section'>
        <Title
          text={
            'Dịch vụ của MagicPost'
          }
          textAlign={'start'}
        />

        <Typography
          variant='h6'
          component='h4'
          sx = {{
            fontWeight: '400',
            paddingTop: 1
          }}
        >
                    Đồng hành cùng bạn trên mọi hành trình
        </Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={6} container>
        <Grid item xs={6} sm={6} md={6}>
          <Card
            square={ true }
            sx={{
              minHeight: 200,
              display: 'flex',
              flexDirection:'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              border: '1px solid #ccc'
            }}>
            <CardContent>
              <IconButton>
                <SportsGymnasticsIcon
                  fontSize="large"
                  color="secondary" />
              </IconButton>
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontWeight: 700,
                  textTransform: 'capitalize'
                }}
              >
                            Dịch vụ trong nước
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={6} md={6}>
          <Card
            square={ true }
            sx={{
              minHeight: 200,
              display: 'flex',
              flexDirection:'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              border: '1px solid #ccc'
            }}>
            <CardContent>
              <IconButton>
                <LocalParkingIcon
                  fontSize="large"
                  color="secondary" />
              </IconButton>
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontWeight: 700,
                  textTransform: 'capitalize'
                }}
              >
                            Dịch vụ quốc tế
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={6} md={6}>
          <Card
            square={ true }
            sx={{
              minHeight: 200,
              display: 'flex',
              flexDirection:'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              border: '1px solid #ccc'
            }}>
            <CardContent>
              <IconButton>
                <FastfoodOutlinedIcon
                  fontSize="large"
                  color="secondary" />
              </IconButton>
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontWeight: 700,
                  textTransform: 'capitalize'
                }}
              >
                            Thương mại điện tử
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={6} md={6}>
          <Card
            square={ true }
            sx={{
              minHeight: 200,
              display: 'flex',
              flexDirection:'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              border: '1px solid #ccc'
            }}>
            <CardContent>
              <IconButton>
                <FastfoodOutlinedIcon
                  fontSize="large"
                  color="secondary" />
              </IconButton>
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontWeight: 700,
                  textTransform: 'capitalize'
                }}
              >
                            Quản lý chất lượng
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </Grid>
  )
}

export default Content