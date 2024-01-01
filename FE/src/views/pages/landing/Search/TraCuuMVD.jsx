import React, { useState } from 'react'
import { Box,  TextField, Dialog} from '@mui/material'
import Title from '../Title'
import Paragraph from '../Paragraph'
import TableStatus from '../../../../utils/TableStatus'
import axiosInstance from '../../../../utils/AxiosInstance'
import {
  Button,
  Modal,
  ModalBody,
} from "reactstrap";

const TraCuuMVD = ({ onSubmit }) => {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState([])
  const [open, setOpen] =useState(false)
  const [modal, setModal] = React.useState(false);

  const handleChangeMVD = (event) => {
    setCode(event.target.value)
    console.log(code)
  }

  const toggle = () => {
    setModal(!modal);
    
    // e.preventDefault()
    console.log("yes")
    getData()
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
      
        {/* <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth='lg' // Chọn kích thước tối đa (xs, sm, md, lg, xl)
          fullWidth
        >
          <div>{TableStatus(status)}</div>
        </Dialog> */}
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
            // component="form"
            // noValidate
            // onSubmit={onSubmit}
            sx={{
              mt: 1,
              py: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <TextField sx={{ width: '400px' }}
              // margin="normal"
              // required
              fullWidth
              id="filled-start-adornment"
              label="VD: 12345, 12346,"
              // name="mvd"
              value={code}
              onChange={handleChangeMVD}
              autoFocus
              variant='filled'
            />
            {/* <Button
              onClick={handleSubmit}
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
            </Button> */}
            {/* <form onSubmit={handleSubmit}>  */}
            <Button
              onClick={toggle}
                color="danger"
                className="btn-round"
                type="submit">
                  Tra cứu
            </Button>
          {/* </form>  */}
          </Box>
        </Box>
      {/* </div> */}
      <Modal isOpen={modal} toggle={() => setModal(false)} className="modal-lg">
        <div className="modal-header justify-content-center">
          {/* <h4 className="title title-up">
            Ước tính cước phí
          </h4> */}
        </div>
        <ModalBody>
        
          <div style={{ padding: '0 0' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
            <div style={{ height: 'auto', width: '100%' }} className='centerList'>
              <div>{TableStatus(status)}</div>
              </div>
            </div>
          </div>
      
        </ModalBody>
        <div className="modal-footer">
        
          <Button
            color="danger"
            type="button"
            onClick={() => {
              setModal(false);
              // window.location.reload() 
            }}
          >
            Đóng
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default TraCuuMVD