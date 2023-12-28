import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import Title from './Title'
import Paragraph from './Paragraph'

const TraCuuMVD = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // console.log({
    //   mvd: data.get('mvd')
    // })
  }
  return (
    <Box
      sx={{
        width: '55%',
        height: 'auto',
        margin: '0px auto',
        padding: '10px',
        marginBottom: '30px'
      }}>
      <Title text='Tra cứu mã vận đơn' textAlign={'center'} />
      <Paragraph
        text={'(Tra nhiều bill bằng cách thêm dấu phẩy giữa các bill)'}
        maxWidth={'sm'}
        mx={0}
        textAlign={'center'}
      />
      <Box
        component="form"
        noValidate
        onSubmit={onSubmit}
        sx={{
          mt: 1,
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <TextField sx={{ width: '400px' }}
          margin="normal"
          required
          fullWidth
          id="mvd"
          label="VD: 12345, 12346,"
          name="mvd"
          autoFocus
        />
        <Button
          variant="contained"
          fullWidth
          type="submit"
          size="medium"
          sx={{
            width: '100px',
            fontSize: '1rem',
            textTransform: 'capitalize',
            py: 2,
            mt: 3,
            mb: 2,
            borderRadius: 3,
            backgroundColor: '#e03d3d',
            '&:hover': {
              backgroundColor: '#1e2a5a'
            }
          }}
        >
                    Tra cứu
        </Button>
      </Box>
    </Box>
  )
}

export default TraCuuMVD
