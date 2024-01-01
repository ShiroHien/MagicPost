import { useState, useEffect } from 'react'

import { Box, Dialog, Typography } from '@mui/material'
import Storefront from '@mui/icons-material/Storefront'
import NearMeIcon from '@mui/icons-material/NearMe'
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import {
  FormGroup,
  Input,
  Button,
  Modal,
  ModalBody
} from 'reactstrap'

import axiosInstance from '../../../../utils/AxiosInstance'

const TimKiemDgd = () => {
  const [open, setOpen] = useState(false)

  const [pointInfo, setPointinfo] = useState()
  // const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')
  const [index, setIndex] = useState()
  const [modal, setModal] = useState()

  const handleChange = (event) => {
    setSelectedProvince(event.target.value)
  }

  const handleChange2 = (event) => {
    setSelectedDistrict(event.target.value)
  }
  const toggle = () => {
    setModal(!modal);
    
    // e.preventDefault()
    console.log("yes")
    getData()
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
      url: `http://localhost:3377/v1/transaction-points/findbyprovincity`,
      data: {
        province: selectedProvince,
        city: selectedDistrict
      }
    })
    console.log('data', response.data)
    setInfo(response.data)
  }

  const filteredDistricts = listDGD
    .filter(item => item.province === selectedProvince)
    .map((item, index) => (
      <option key={`district-${index}`} value={item.district}>
        {item.district}
      </option>
    ));

    const filterPoints= () => {
      const filteredNames = listDGD.filter(item => item.province === selectedProvince && item.district === selectedDistrict)
        .map((item, index));
  
      setPointinfo(filteredNames);
    };


    // useEffect(() => {
    //   pointInfo();
    // }, [selectedDistrict]);

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
      
        <FormGroup className='col-md-5'>
          <div className="label">Tỉnh thành</div>
            <Input
              bsSize="lg"
              className="mb-3"
              type="select" onChange={async (event) => { setSelectedProvince(event.target.value) }}
              defaultValue=""
              required
            >
              <option value="" disabled>Chọn...</option>
              {[...new Set(listDGD.map(item => item.province))].map((province, index) => (
              <option key={`province-${index}`} value={province}>
                {province}
              </option>
              ))}
            </Input>
        </FormGroup>
        <FormGroup className='col-md-5'>
          <div className="label">Quận huyện</div>
            <Input
              id="inputDistrict"
              type="select"
              onChange={(event) => {
                setSelectedDistrict(event.target.value)
                Province();
              }}
              value={selectedDistrict}
              required
            >
              <option value="" disabled>Chọn...</option>
              {filteredDistricts}
            </Input>
        </FormGroup>

        <Button
          onClick={toggle}
            color="danger"
            className="btn-round"
            type="submit">
              Tra cứu
        </Button>
      </Box>

      <Modal isOpen={modal} toggle={() => setModal(false)} className="modal-lg">
        <div className="modal-header justify-content-center">
          <h4 className="title title-up">
            Tra cứu bưu cục
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
              {/* <div>{TableCuocPhi(type, weight, size)}</div> */}
                              <ul>
                              {pointInfo.map((name, index) => (
            <li key={`name-${index}`}>{name}</li>
          ))}
                  </ul>
                
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

export default TimKiemDgd

const listDGD = [{
  "district": "Ba Đình",
  "province": "Hà Nội",
  "name": "Điểm giao dịch tại: 123 Chùa Láng, Ba Đình, Hà Nội"
},
{
  "district": "Bắc Từ Liêm",
  "province": "Hà Nội",
  "name": "Điểm giao dịch tại: 35 Cầu Diễn, Bắc Từ Liêm, Hà Nội"
},
{
  "district": "Cầu Giấy",
  "province": "Hà Nội",
  "name": "Điểm giao dịch tại: 163 Hoàng Quốc Việt, Cầu Giấy, Hà Nội"
},
{
  "district": "Đống Đa",
  "province": "Hà Nội",
  "name": "Điểm giao dịch tại: 240 La Thàn, Đống Đa, Hà Nội"
},
{
  "district": "Hoàng Mai",
  "province": "Hà Nội",
  "name": "Điểm giao dịch tại: 328 Lê Trọng Tấn, Hoàng Mai, Hà Nội"
},
{
  "district": "Nam Từ Liêm",
  "province": "Hà Nội",
  "name": "Điểm giao dịch tại: 63 Lê Đức Thọ, Nam Từ Liêm, Hà Nội"
},
{
  "district": "Thanh Xuân",
  "province": "Hà Nội",
  "name": "Điểm giao dịch tại: 236 Khương Đình, Thanh Xuân, Hà Nội"
},
{
  "district": "Hiệp Hoà",
  "province": "Bắc Giang",
  "name": "Điểm giao dịch tại: Số 25 Ngô Quyền, Lục Ngạn, Bắc Giang"
},
{
  "district": "Sơn Động",
  "province": "Bắc Giang",
  "name": "Điểm giao dịch tại: 135 Trần Phú, Sơn Động, Bắc Giang"
},
{
  "district": "Tân Yên",
  "province": "Bắc Giang",
  "name": "Điểm giao dịch tại: 30 Lý Thường Kiệt, Tân Yên, Bắc Giang"
},
{
  "district": "Yên Dũng",
  "province": "Bắc Giang",
  "name": "Điểm giao dịch tại: 110 Lê Lợi, Yên Dũng, Bắc Giang"
},
{
  "district": "TP. Nam Định",
  "province": "Nam Định",
  "name": "Điểm giao dịch tại: 29 Trần Hưng Đạo, TP. Nam Định, Nam Định"
},
{
  "district": "Nam Trực",
  "province": "Nam Định",
  "name": "Điểm giao dịch tại: 83 Lê Hồng Phong, Nam Trực, Nam Định"
},
{
  "district": "Nghĩa Hưng",
  "province": "Nam Định",
  "name": "Điểm giao dịch tại: 65 Nghĩa Minh, Nghĩa Hưng, Nam Định"
},
{
  "district": "Ý Yên",
  "province": "Nam Định",
  "name": "Điểm giao dịch tại: 145 Trần Bình, Ý Yên, Nam Định"
},
{
  "district": "Hải Hậu",
  "province": "Nam Định",
  "name": "Điểm giao dịch tại: 14 Hải Vân, Hải Hậu, Nam Định"
},
{
  "district": "Xuân Trường",
  "province": "Nam Định",
  "name": "Điểm giao dịch tại: 17 Xuân Phương, Xuân Trường, Nam Định"
},
{
  "district": "TP. Đà Nẵng",
  "province": "Đà Nẵng",
  "name": "Điểm giao dịch tại: 14 Đà Lạt, TP. Đà Nẵng, Đà Nẵng"
},
{
  "district": "Hải Châu",
  "province": "Đà Nẵng",
  "name": "Điểm giao dịch tại: 45 Bạch Đằng, Hải Châu, Đà Nẵng"
},
{
  "district": "Thanh Khê",
  "province": "Đà Nẵng",
  "name": "Điểm giao dịch tại: 53 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng"
},
{
  "district": "Sơn Trà",
  "province": "Đà Nẵng",
  "name": "Điểm giao dịch tại: 132 Sơn Chiều, Sơn Trà, Đà Nẵng"
},
{
  "district": "Liên Chiểu",
  "province": "Đà Nẵng",
  "name": "Điểm giao dịch tại: 163 Hà Huy Tập, Liên Chiểu, Đà Nẵng"
},
{
  "district": "Quận 2",
  "province": "Hồ Chí Minh",
  "name": "Điểm giao dịch tại: 84 Trần Thái Tông, Quận 2, Hồ Chí Minh"
},
{
  "district": "Quận 9",
  "province": "Hồ Chí Minh",
  "name": "Điểm giao dịch tại: 34 Nguyễn Huệ, Quận 9, Hồ Chí Minh"
},
{
  "district": "Thủ Đức",
  "province": "Hồ Chí Minh",
  "name": "Điểm giao dịch tại: 82 Thảo Điền, Thủ Đức, Hồ Chí Minh"
},
{
  "district": "Quận 7",
  "province": "Hồ Chí Minh",
  "name": "Điểm giao dịch tại: 51 Võ Văn Tần, Quận 7, Hồ Chí Minh"
},
{
  "district": "Quận 12",
  "province": "Hồ Chí Minh",
  "name": "Điểm giao dịch tại: 132 Tôn Đức Thắng, Quận 12, Hồ Chí Minh"
},
{
  "district": "Tân Phú",
  "province": "Hồ Chí Minh",
  "name": "Điểm giao dịch tại: 22 Châu Văn Liêm, Tân Phú, Hồ Chí Minh"
}]