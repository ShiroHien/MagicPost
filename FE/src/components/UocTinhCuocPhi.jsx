import { useState, useEffect } from 'react'

import { Box, Button, Typography, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import PaidIcon from '@mui/icons-material/Paid'
import NearMeIcon from '@mui/icons-material/NearMe'
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LocalShipping from '@mui/icons-material/LocalShipping'

import axiosInstance from '../utils/AxiosInstance'
import TableCuocPhi from '../utils/TableCuocPhi'
import Dialog from '@mui/material/Dialog'

const UocTinhCuocPhi = () => {
  const [open, setOpen] = useState('false')
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
    } else {
      setOpen(false)
    }
  }

  const dummyProvince = [
    { label: "Bắc Giang" },
    { label: "Đà Nẵng" },
    { label: "Hà Nội" },
    { label: "Hà Nam" },
    { label: "Hải Dương" },
    { label: "Hải Phòng" },
    { label: "Hồ Chí Minh" },
    { label: "Nam Định" },
    { label: "Thanh Hóa" },
    { label: "Vĩnh Phúc" }
  ]
  const dummmySize = [
    { label: "Tổng kích thước dài + rộng + cao không vượt quá 30cm", value: 'small' },
    { label: "Tổng kích thước dài + rộng + cao không vượt quá 100cm", value: 'medium' },
    { label: "Tổng kích thước dài + rộng + cao không vượt quá 203cm", value: 'large' }
  ]
  const dummmyType = [
    { label: "Tài liệu", value: 'Letter' },
    { label: "Hàng hóa", value: 'Parcel' }
  ]

  return (
    <>
      <Dialog 
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg" // Chọn kích thước tối đa (xs, sm, md, lg, xl)
        fullWidth>
        {/* Hiển thị dữ liệu */}
        {(Postage) ? <Box>
          <PaidIcon/> {'Ước tính cước phí'}
          <div>{TableCuocPhi(type, weight, size)}</div>
        </Box> : <></>}
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
              <MenuItem value="" disabled><em>Chọn Tỉnh</em></MenuItem>
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
              <MenuItem value="" disabled><em>Chọn Quận Huyện</em></MenuItem>
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
              <MenuItem value="" disabled><em>Chọn Tỉnh</em></MenuItem>
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
              <MenuItem value="" disabled><em>Chọn Quận Huyện</em></MenuItem>
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
              <MenuItem value="" disabled><em>Chọn Loại Hàng</em></MenuItem>
              {dummmyType.map((dummmyType) => (
                <MenuItem value={dummmyType.value} key={dummmyType.value}>{dummmyType.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <TextField
            fullWidth
            label="Trọng lượng"
            id="filled-start-adornment"
            onChange={handleChange6}
            InputProps={{
              startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
              sx: { marginBottom: '10px' }
            }}
            variant="filled"
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
              <MenuItem value="" disabled><em>Chọn Kích Cỡ</em></MenuItem>
              {dummmySize.map((dummmySize) => (
                <MenuItem value={dummmySize.value} key={dummmySize.value}> {dummmySize.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" fullWidth onClick={handleSearch}>Tra cứu</Button>
        </Box>
      </Dialog>
    </>
  )
}

export default UocTinhCuocPhi
