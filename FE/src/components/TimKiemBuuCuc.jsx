import { Box, Button } from '@mui/material'
import Storefront from '@mui/icons-material/Storefront'
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material'

import { useState } from 'react'

const TimKiemBuuCuc = () => {
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')

  const handleChange = (event) => {
    setProvince(event.target.value)
  }

  const handleChange2 = (event) => {
    setDistrict(event.target.value)
  }

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(236, 234, 234)',
        width: '100%',
        height: 'auto',
        margin: '0px auto',
        padding: '10px'
      }}>
      <Storefront /><b> Tìm kiếm bưu cục</b>
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
      <Button variant="contained" fullWidth>Tìm kiếm</Button>
    </Box>
  )
}

export default TimKiemBuuCuc
