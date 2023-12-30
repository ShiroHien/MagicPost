import React, { useState } from 'react'
import { Box, Button, TextField, Dialog} from '@mui/material'
import Title from '../Title'
import Paragraph from '../Paragraph'
import Navbar from '../../../../components/Navbars/Navbar'
import Footer from '../../../../components/Footer/Footer'
import TableStatus from '../../../../utils/TableStatus'
import axiosInstance from '../../../../utils/AxiosInstance'

const TraCuuMVD = ({ onSubmit }) => {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState([])
  const [open, setOpen] =useState(false)

  const handleChangeMVD = (event) => {
    setCode(event.target.value)
  }
  const handleSubmit = () => {
    if (code) {
      getData()
      setOpen(true)
    }
  }

  const getData = async() => {
    let response = await axiosInstance({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `http://localhost:3377/v1/postal-goods/findbycode`,
      data: {
        code: code
      }
    })
    console.log('data', response.data)
    setStatus(response.data)
  }

  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth='lg' // Chọn kích thước tối đa (xs, sm, md, lg, xl)
          fullWidth
        >
          <div>{TableStatus(status)}</div>
        </Dialog>
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
              value={code}
              onChange={() => handleChangeMVD()}
              autoFocus
            />
            <Button
              onClick={() => handleSubmit()}
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
      </div>
    </>
  )
}

export default TraCuuMVD
