import { useState, useEffect } from 'react'

import { Box, Button, Dialog, Typography } from '@mui/material'
import Storefront from '@mui/icons-material/Storefront'
import NearMeIcon from '@mui/icons-material/NearMe'
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import {
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material'

import axiosInstance from '../../../../utils/AxiosInstance'

const TimKiemDgd = () => {
  const [open, setOpen] = useState('false')

  const [pointInfo, setInfo] = useState()
  const [areaFilter, setAterFilter] = useState('false')
  // const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')
  const [index, setIndex] = useState()

  const handleChange = (event) => {
    setSelectedProvince(event.target.value)
  }

  const handleChange2 = (event) => {
    setSelectedDistrict(event.target.value)
  }
  //_______________________________API SELECT_________________________________________________________
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
    // console.log('   district', response.data)
  }

  //_______________________________API GET INFORMATION POINT__________________________________
  const handleSearch = async() => {
    console.log('gọi api lấy data cho table', selectedDistrict, selectedProvince)
    getData()
    setOpen(true)
    setIndex(Math.floor(Math.random() * 7))
  }

  const getData = async() => {
    let response = await axiosInstance({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `http://localhost:3377/v1/transaction-points/findid`,
      data: {
        province: selectedProvince,
        city: selectedDistrict
      }
    })
    console.log('data', response.data)
    setInfo(response.data)
  }

  const dummyProvince = [
    { label: 'Bắc Giang' },
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
  const dummyPhone = ['0987 651 212', '0356 636 777', '0843 987 234', '0865 756 345', '0956 874 754', '0372 543 123', '0854 678 910']

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth='lg' // Chọn kích thước tối đa (xs, sm, md, lg, xl)
        fullWidth>
        {/* Hiển thị dữ liệu */}
        {(open&&pointInfo&&index) ? <Box sx={{
          backgroundColor: '#f7f7f7', // Màu nền
          borderRadius: '8px', // Viền góc tròn
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)', // Hiệu ứng box-shadow
          width: '55%',
          height: 'auto',
          margin: '0px auto',
          padding: '20px' // Tăng padding để làm cho nó dễ đọc hơn
        }} >
          <Typography variant='h5' component='div'>
            <NearMeIcon /><b> Thông tin bưu cục</b>
          </Typography>
          <Typography variant='body1' component='div'>
            <LocationOnIcon />{pointInfo.name}
          </Typography>
          <Typography variant='body1' component='div'>
            <PermPhoneMsgIcon />{dummyPhone[index]}
          </Typography>
          <Typography variant='body1' component='div'>
            <LocalOfferIcon />{pointInfo.city.toUpperCase()+ ', '+ pointInfo.province.toUpperCase()}
          </Typography>
        </Box> : <></>} 
      </Dialog>
      <Box
        sx={{
          backgroundColor: 'rgb(236, 234, 234)',
          width: '55%',
          height: 'auto',
          margin: '0px auto',
          padding: '10px',
          display: 'block'
        }}>
        <Storefront /><b> Tìm kiếm bưu cục</b>
        <FormControl
          sx={{
            display: 'block',
            borderBottom: 'none',
            marginBottom: '1vw'
          }}>

          {/* Lựa chọn Tỉnh */}
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
          {/* Lựa chọn quận/ huyện */}
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
        <Button variant='contained' fullWidth onClick={handleSearch}>Tìm kiếm</Button>
      </Box>
       
    </>
  )
}

export default TimKiemDgd
