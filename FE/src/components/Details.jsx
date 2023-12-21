import React from 'react'
import {
  Box,
  Button,
  Stack,
  TextField
} from '@mui/material'
import Title from './Title'
import Paragraph from './Paragraph'

const Details = () => {

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      mvd: data.get('mvd')
    })
  }


  return (
    <Stack
      component='section'
      direction="column"
      justifyContent= 'center'
      alignItems='center'
      sx={{
        py: 10,
        px: 2
      }}
    >
      <Title
        text={
          'Tra cúu mã vận đơn'
        }
        textAlign={'center'}
      />
      <Paragraph
        text={
          '(Tra nhiều bill bằng cách thêm dấu phẩy giữa các bill)'
        }
        maxWidth = {'sm'}
        mx={0}
        textAlign={'center'}
      />

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
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
          label="VD: 123,456"
          name="mvd"
          autoFocus
        />
        <Button
          variant="contained"
          fullWidth
          type="submit"
          size="medium"
          sx= {{
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
    </Stack>
  )
}

export default Details