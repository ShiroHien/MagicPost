/* eslint-disable quotes */
import React from 'react'
import { useState, useEffect } from 'react'

import { Box, FormControl, InputAdornment, Dialog, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import PaidIcon from '@mui/icons-material/Paid'
import LocalShipping from '@mui/icons-material/LocalShipping'

import axiosInstance from '../../../../utils/AxiosInstance'
import TableCuocPhi from '../../../../utils/TableCuocPhi'
import {
  Button,
  Modal,
  ModalBody,
  FormGroup,
} from "reactstrap";

const UocTinhCuocPhi = () => {
  const [open, setOpen] = useState(false)
  // const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [districts2, setDistricts2] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict2, setSelectedDistrict2] = useState('')
  const [selectedProvince2, setSelectedProvince2] = useState('')
  const [size, setSize] = useState()
  const [type, setType] = useState()
  const [weight, setWeight] = useState()
  const [Postage, setPostage] = useState()
  const [modal, setModal] = React.useState(false);


  //_________________________________HANDLE CHANGE__________________________________________________
  const handleChange = (event) => {
    setSelectedProvince(event.target.value)
  }

  const handleChange2 = (event) => {
    setSelectedDistrict(event.target.value)
  }

  const handleChange3 = (event) => {
    setSelectedProvince2(event.target.value)
  }

  const handleChange4 = (event) => {
    setSelectedDistrict2(event.target.value)
  }

  const handleChange5 = (event) => {
    setType(event.target.value)
  }

  const handleChange6 = (event) => {
    setWeight(event.target.value)
  }

  const handleChange7 = (event) => {
    setSize(event.target.value)
  }
  //_________________________________API SELECT 1__________________________________________________


  useEffect(() => {
    if (selectedProvince) {
      getDistricts()
    } else {
      // If no province is selected, clear districts
      setDistricts([])
    }
  }, [selectedProvince])
  // Gọi API để lấy warehouseId từ provinces vs districts
  const getDistricts = async () => {
    // console.log('gọi api lấy district', selectedProvince)
    let response = await axiosInstance({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `http://localhost:3377/v1/transaction-points/finddistrict`,
      data: {
        selectedprovince: selectedProvince
      }
    })
    setDistricts(response.data)
    // console.log('district', response.data)
  }

  //_________________________________API SELECT 2__________________________________________________
  useEffect(() => {
    if (selectedProvince2) {
      getDistricts2()
    } else {
      // If no province is selected, clear districts
      setDistricts2([])
    }
  }, [selectedProvince2])
  // Gọi API để lấy warehouseId từ provinces vs districts
  const getDistricts2 = async () => {
    let response = await axiosInstance({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `http://localhost:3377/v1/transaction-points/finddistrict`,
      data: {
        selectedprovince: selectedProvince2
      }
    })
    setDistricts2(response.data)
  }
  // ______________________________ __TÍNH CƯỚC PHÍ_________________________________________________
  const handleSearch = (event) => {
    if (selectedDistrict&&selectedDistrict2&&selectedProvince&&selectedDistrict2&&size&&type&&weight) {
      setPostage(1)
      setOpen(true)
    } else {
      setOpen(false)
    }
  }
  const handleSubmit = async (e) => {
    if (selectedDistrict&&selectedDistrict2&&selectedProvince&&selectedDistrict2&&size&&type&&weight) {
      setPostage(1)
      setModal(true);
    }
    e.preventDefault();
    console.log("Form submitted successfully");
  }

  const dummyProvince = [
    { label: 'Bắc Giang'},
    { label: 'Đà Nẵng' },
    { label: 'Hà Nội' },
    { label: 'Hà Nam' },
    { label: 'Hải Dương' },
    { label: 'Hải Phòng' },
    { label: 'Hồ Chí Minh' },
    { label: 'Nam Định' },
    { label: 'Thanh Hóa' },
    { label: 'Vĩnh Phúc' }
  ]
  const dummmySize = [
    { label: 'Tổng kích thước dài + rộng + cao không vượt quá 30cm', value: 'Small' },
    { label: 'Tổng kích thước dài + rộng + cao không vượt quá 100cm', value: 'Medium' },
    { label: 'Tổng kích thước dài + rộng + cao không vượt quá 203cm', value: 'Large' }
  ]
  const dummmyType = [
    { label: 'Tài liệu', value: 'Letter' },
    { label: 'Hàng hóa', value: 'Parcel' }
  ]

  return (
    <>
      {/* <Dialog
        
        // onClose={() => setOpen(false)}
        // open={open}
        maxWidth='lg' // Chọn kích thước tối đa (xs, sm, md, lg, xl)
        fullWidth>
        Hiển thị dữ liệu
        {(Postage) ? <Box>
          <PaidIcon/> {'Ước tính cước phí'}
          <div>{TableCuocPhi(type, weight, size)}</div>
        </Box> : <></>}</Dialog> */}
      <Box
        sx={{
          backgroundColor: 'rgb(236, 234, 234)',
          width: '55%',
          height: 'auto',
          margin: '0px auto',
          padding: '10px',
          marginBottom: '30px'
        }}>
        <LocalShipping /><b> Ước tính cước phí</b>
        <FormControl
          sx={{
            display: 'block',
            borderBottom: 'none',
            marginBottom: '1vw'
          }}>
          <InputLabel shrink sx = {{ margin: '10px' }}>Gửi từ</InputLabel>
          <Select
            fullWidth
            value={selectedProvince}
            onChange={handleChange}
            displayEmpty
            sx={{
              display: 'block',
              margin: '5px 0px'
            }}
          >
            <MenuItem value='' disabled><em>Chọn Tỉnh thành</em></MenuItem>
            {dummyProvince.map((provinces) => (
              <MenuItem value={provinces.label} key={provinces.label} >{provinces.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            display: 'block',
            borderBottom: 'none',
            marginBottom: '1vw'
          }}>
          <Select
            fullWidth
            value={selectedDistrict}
            onChange={handleChange2}
            displayEmpty
            sx={{
              display: 'block',
              margin: '5px 0px'
            }}
          >
            <MenuItem value='' disabled><em>Chọn Quận Huyện</em></MenuItem>
            {districts.map((districts) => (
              <MenuItem value={districts.label} key={districts.label}>{districts.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl
          sx={{
            display: 'block',
            borderBottom: 'none',
            marginBottom: '1vw'
          }}>
          <InputLabel shrink sx = {{ margin: '10px' }}>Gửi đến</InputLabel>
          <Select
            fullWidth
            value={selectedProvince2}
            onChange={handleChange3}
            displayEmpty
            sx={{
              display: 'block',
              margin: '5px 0px'
            }}
          >
            <MenuItem value='' disabled><em>Chọn Tỉnh</em></MenuItem>
            {dummyProvince.map((provinces) => (
              <MenuItem value={provinces.label} key={provinces.label} >{provinces.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            display: 'block',
            borderBottom: 'none',
            marginBottom: '1vw'
          }}>
          <Select
            fullWidth
            value={selectedDistrict2}
            onChange={handleChange4}
            displayEmpty
            sx={{
              display: 'inline-block',
              margin: '5px 0px'
            }}
          >
            <MenuItem value='' disabled><em>Chọn Quận Huyện</em></MenuItem>
            {districts2.map((districts) => (
              <MenuItem value={districts.label} key={districts.label}>{districts.label}</MenuItem>
            ))}
          </Select>
        </FormControl >
        <br/>
        <FormControl
          sx={{
            display: 'block',
            borderBottom: 'none',
            marginBottom: '1vw'
          }}>
          <Select
            fullWidth
            value={type}
            onChange={handleChange5}
            displayEmpty
            sx={{
              display: 'inline-block',
              margin: '5px 0px'
            }}
          >
            <MenuItem value='' disabled><em>Chọn Loại Hàng</em></MenuItem>
            {dummmyType.map((dummmyType) => (
              <MenuItem value={dummmyType.value} key={dummmyType.value}>{dummmyType.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <TextField
          fullWidth
          label='Trọng lượng'
          id='filled-start-adornment'
          onChange={handleChange6}
          InputProps={{
            startAdornment: <InputAdornment position='start'>Kg</InputAdornment>,
            sx: { marginBottom: '10px' }
          }}
          variant='filled'
        />
        <br />
        <FormControl
          sx={{
            display: 'block',
            borderBottom: 'none',
            marginBottom: '1vw'
          }}>
          <Select
            fullWidth
            value={size}
            onChange={handleChange7}
            displayEmpty
            sx={{
              display: 'inline-block',
              margin: '5px 0px'
            }}
          >
            <MenuItem value='' disabled><em>Chọn Kích Cỡ</em></MenuItem>
            {dummmySize.map((dummmySize) => (
              <MenuItem value={dummmySize.value} key={dummmySize.value}> {dummmySize.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <form onSubmit={handleSubmit}> 
            <Button
                color="danger"
                className="btn-round"
                type="submit">
                  Tra cứu
            </Button>
          </form> 
      </Box>
      <Modal isOpen={modal} toggle={() => setModal(false)} className="modal-lg">
        <div className="modal-header justify-content-center">
          <h4 className="title title-up">
            Ước tính cước phí
          </h4>
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
              <div>{TableCuocPhi(type, weight, size)}</div>
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

export default UocTinhCuocPhi