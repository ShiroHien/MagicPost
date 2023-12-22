import React, { useState } from 'react'
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import LocalShipping from '@mui/icons-material/LocalShipping'

const UocTinhCuocPhi = () => {
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [province2, setProvince2] = useState('')
  const [district2, setDistrict2] = useState('')

  const handleChange = (event) => {
    setProvince(event.target.value)
  }

  const handleChange2 = (event) => {
    setDistrict(event.target.value)
  }

  const handleChange3 = (event) => {
    setProvince2(event.target.value)
  }

  const handleChange4 = (event) => {
    setDistrict2(event.target.value)
  }

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(236, 234, 234)',
        width: '55%',
        height: '420px',
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
        <InputLabel shrink>Gửi từ</InputLabel>
        <Select
          fullWidth
          value={province}
          onChange={handleChange}
          displayEmpty
          sx={{
            display: 'block',
            margin: '5px 0px'
          }}
        >
          <MenuItem value="" disabled><em>Chọn Tỉnh/TP</em></MenuItem>
          <MenuItem value="TP.Hà Nội">TP.Hà Nội</MenuItem>
          <MenuItem value="TP.HCM">TP.HCM</MenuItem>
          <MenuItem value="TP.Đà Nẵng">TP.Đà Nẵng</MenuItem>
          <MenuItem value="TP.Hải Phòng">TP.Hải Phòng</MenuItem>
          <MenuItem value="TP.Tiền Giang">TP.Tiền Giang</MenuItem>
          <MenuItem value="TP.Cần Thơ">TP.Cần Thơ</MenuItem>
          <MenuItem value="TP.Hậu Giang">TP.Hậu Giang</MenuItem>
          <MenuItem value="T.Vĩnh Phúc">T.Vĩnh Phúc</MenuItem>
          <MenuItem value="T.Hải Dương">T.Hải Dương</MenuItem>
          <MenuItem value="T.Hà Nam">T.Hà Nam</MenuItem>
        </Select>
        <br />
        <Select
          fullWidth
          value={district}
          onChange={handleChange2}
          displayEmpty
          sx={{
            display: 'block',
            margin: '5px 0px'
          }}
        >
          <MenuItem value="" disabled><em>Chọn Quận/Huyện</em></MenuItem>
          <MenuItem value="Q.Ba Đình">Q.Ba Đình</MenuItem>
          <MenuItem value="Q.Tây Hồ">Q.Tây Hồ</MenuItem>
          <MenuItem value="Q.Cầu Giấy">Q.Cầu Giấy</MenuItem>
          <MenuItem value="Q.Hai Bà Trưng">Q.Hai Bà Trưng</MenuItem>
          <MenuItem value="Q.Đống Đa">Q.Đống Đa</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{
          display: 'block',
          borderBottom: 'none',
          marginBottom: '1vw'
        }}>
        <InputLabel shrink>Gửi đến</InputLabel>
        <Select
          fullWidth
          value={province2}
          onChange={handleChange3}
          displayEmpty
          sx={{
            display: 'block',
            margin: '5px 0px'
          }}
        >
          <MenuItem value="" disabled><em>Chọn Tỉnh/TP</em></MenuItem>
          <MenuItem value="TP.Hà Nội">TP.Hà Nội</MenuItem>
          <MenuItem value="TP.HCM">TP.HCM</MenuItem>
          <MenuItem value="TP.Đà Nẵng">TP.Đà Nẵng</MenuItem>
          <MenuItem value="TP.Hải Phòng">TP.Hải Phòng</MenuItem>
          <MenuItem value="TP.Tiền Giang">TP.Tiền Giang</MenuItem>
          <MenuItem value="TP.Cần Thơ">TP.Cần Thơ</MenuItem>
          <MenuItem value="TP.Hậu Giang">TP.Hậu Giang</MenuItem>
          <MenuItem value="T.Vĩnh Phúc">T.Vĩnh Phúc</MenuItem>
          <MenuItem value="T.Hải Dương">T.Hải Dương</MenuItem>
          <MenuItem value="T.Hà Nam">T.Hà Nam</MenuItem>
        </Select>
        <br />
        <Select
          fullWidth
          value={district2}
          onChange={handleChange4}
          displayEmpty
          sx={{
            display: 'inline-block',
            margin: '5px 0px'
          }}
        >
          <MenuItem value="" disabled><em>Chọn Quận/Huyện</em></MenuItem>
          <MenuItem value="Q.Ba Đình">Q.Ba Đình</MenuItem>
          <MenuItem value="Q.Tây Hồ">Q.Tây Hồ</MenuItem>
          <MenuItem value="Q.Cầu Giấy">Q.Cầu Giấy</MenuItem>
          <MenuItem value="Q.Hai Bà Trưng">Q.Hai Bà Trưng</MenuItem>
          <MenuItem value="Q.Đống Đa">Q.Đống Đa</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Trọng lượng"
        id="filled-start-adornment"
        InputProps={{
          startAdornment: <InputAdornment position="start">gram</InputAdornment>,
          sx: { marginBottom: '10px' }
        }}
        variant="filled"
      />
      <br />
      <Button variant="contained" fullWidth>Tra cứu</Button>
    </Box>
  )
}

export default UocTinhCuocPhi
