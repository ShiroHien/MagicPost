import React from 'react'
import { useState, useEffect } from 'react'
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Button,
} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { TYPE_ACCOUNT } from '../../../utils/constants'
import axiosInstance from '../../../utils/AxiosInstance'
// import getAreaByProvince from 'functions/getAreaByProvince'
import capitalize from '../../../utils/captalized'

function LeaderCreateAcc () {
  const [type, setType] = useState('')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pointName, setPointName] = useState('')
  const [managerName, setManagerName] = useState("")
  const [pointId, setPointId] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [districts, setDistricts] = useState([])
  const [address, setAddress] = useState('')

  const navigate = useNavigate()

  let checkPassword = () => {
    if (repeatPassword === password) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    if (province) {
      getDistricts()
    } else {
      // If no province is selected, clear districts
      setDistricts([])
    }
  }, [province])

  // Gọi API để lấy warehouseId từ provinces vs districts
  const getDistricts = async () => {
    console.log('gọi api lấy district', province)
    let response = await axiosInstance({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      url: `http://localhost:3377/v1/transaction-points/finddistrict`,
      data: {
        selectedprovince: province
      }
    })
    setDistricts(response.data)
    console.log('   district', response.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Xử lý dữ liệu khi form được gửi đi
    console.log('gửi form',pointName)

    try {
      if (checkPassword()) {
        await axiosInstance({
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'post',
          url: `http://localhost:3377/v1/accounts/create`, //API nào?
          data: {
            'typeAccount': type,
            'password': password,
            'email': email,
            'phone': phone,
            'point_name': pointName,
            'point_id': pointId,
            'province': province,
            'distric': district,
            'address': address
          }
          }).then((response) => {
          setPointId(response.data._id)
          alert('Tạo user thành công')
          window.location.reload()
        })} else { alert('Mật khẩu nhập lại chưa đúng') } 
    } catch (error) {alert(error.message)}
  }
  const back = () => {
    navigate(-1)
  }

  const types = [
    { label: TYPE_ACCOUNT.leaderOfWarehouse },
    { label: TYPE_ACCOUNT.leaderOfTransaction }
  ]
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
  return (
    <>
      <Card className='col-md-9'>
        <Button className='btn-round btnBack' color='danger' type='button' onClick={back}>
          Quay lại
        </Button>
        <div>
        </div>
        <CardBody>
          <CardTitle className="my-form-title">Tạo tài khoản Trưởng Điểm</CardTitle>
          <Form onSubmit={handleSubmit}>
            <div className="form-row">
            {/* <FormGroup className='col-md-4'>
                <label htmlFor="point_id">Mã điểm</label>
                <Input
                  readOnly
                  id="point_id"
                  placeholder={pointId}
                  type="text"
                  onChange={(event) => { setPointId(event.target.value) }}
                  required
                ></Input>
              </FormGroup> */}
              <FormGroup className='col-md-4'>
                <label htmlFor="point_name">Họ tên</label>
                <Input
                  id="point_name"
                  placeholder={managerName}
                  onChange={async (event) => {
                    const capitalizedValue = await capitalize(event.target.value);
                    setManagerName(capitalizedValue);
                  }}
                  onBlur={async (event) => {
                    const capitalizedValue = await capitalize(event.target.value);
                    event.target.value = capitalizedValue;
                  }}
                  required
                ></Input>
              </FormGroup>
              <FormGroup className="col-md-4">
                <label htmlFor="inputPassword4">Mật khẩu</label>
                <Input
                  id='inputPassword4'
                  placeholder={password}
                  type='password'
                  onChange={(event) => { setPassword(event.target.value) }}
                  required
                ></Input>
              </FormGroup>
              <FormGroup className="col-md-4">
                <label htmlFor="inputReenterPassword4">Nhập lại mật khẩu</label>
                <Input
                  id='inputReenterPassword4'
                  placeholder={repeatPassword}
                  type='password'
                  onChange={(event) => { setRepeatPassword(event.target.value) }}
                  required
                ></Input>
              </FormGroup>
            </div>
            <div className='form-row'>
              <FormGroup className="col-md-4">
                <label htmlFor="inputEmail4">Email</label>
                <Input id="inputEmail4" placeholder={email} type="email" onChange={(event) => { setEmail(event.target.value) }} required
                ></Input>
              </FormGroup>
              <FormGroup className="col-md-4">
                <label htmlFor="contact_number">Số điện thoại</label>
                <Input id="contact_number" placeholder={phone} type="text" onChange={(event) => { setPhone(event.target.value) }} required
                ></Input>
              </FormGroup>
              <FormGroup className='col-md-4'>
                {/* <label htmlFor="province">Thành phố/Tỉnh</label> */}
                <div className="label">Vị trí</div>
                <Input
                  id="inputState" type="select" onChange={async (event) => { setRank(event.target.value) }}
                  defaultValue=""
                  required
                >
                  <option value="" disabled>Chọn...</option>
                  {ranks.map((item, index) => (
                    <option key={`rank-${index}`} value={item.label}>
                      {item.label}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <div className='form-row'>
              <FormGroup className='col-md-5'>
                {/* <label htmlFor='province'>Thành phố/Tỉnh</label> */}
                <div className='label'>Tỉnh thành</div>
                <Input
                  id='inputState' type='select' onChange={async (event) => { setProvince(event.target.value) }}
                  value={province}
                  defaultValue=''
                  required
                >
                  <option value='' disabled>Chọn...</option>
                  {dummyProvince.map((item, index) => (
                    <option key={`dummyProvince-${index}`}>
                      {item.label}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup className='col-md-6'>
                {/* <label htmlFor="district">Quận/Huyện</label> */}
                <div className="label">Điểm</div>
                <Input
                  id="inputState"
                  type="select"
                  onChange={async (event) => { setPointName(event.target.value) }}
                  defaultValue=""
                  required
                >
                <option value="" disabled>Chọn...</option>
                {province &&
                  PandD.find((item) => item.province === province)?.points.map((points, index) => (
                    <option key={`points-${index}`} value={points}>
                      {points}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <FormGroup>
              <label htmlFor='address'>Địa chỉ</label>
              <Input
                id='address'
                placeholder={address}
                type='text'
                onChange={async (event) => {
                  const capitalizedValue = await capitalize(event.target.value)
                  setAddress(capitalizedValue)
                }}
                onBlur={async (event) => {
                  const capitalizedValue = await capitalize(event.target.value)
                  event.target.value = capitalizedValue
                }}
                required
              ></Input>
            </FormGroup>
          
            <Button
              color='danger'
              className='btn-round'
              type='submit'
            >
              Tạo
            </Button>
          </Form>
        </CardBody>
      </Card>

    </>
  );

}
const ranks = [
  {label: "Trưởng Điểm Tập Kết"},
  {label: "Trưởng Điểm Giao Dịch"}

]
const PandD = [
  {
    "province": "Bắc Giang", 
    "points": 
      [
      "Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội", 
      "Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội", 
      ]
  },
  {	
      "province": "Bắc Ninh", 
      "points": 
      [
        "Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội", 
        "Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội", 
      ]
  }
]

export default LeaderCreateAcc;