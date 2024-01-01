import React from 'react';
import { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function LeaderCreateDTK() {
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [pointName, setPointName] = useState("")
  const [pointId, setPointId] = useState("")
  const [province, setProvince] = useState("")
  const [district, setDistrict] = useState("")
  const [address, setAddress] = useState("")
  const [DTK, setDTK] = useState("")

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Xử lý dữ liệu khi form được gửi đi
    // console.log(pointName);
    // if (checkPassword()) {
    //   await axiosInstance({
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     method: 'post',
    //     url: `http://localhost:3010/user/create`, //API nào?
    //     data: {
    //       'rank': rank,
    //       'account': account,
    //       'password': password,
    //       'email': email,
    //       'contact_number': phone,
    //       'point_name': pointName,
    //       'point_id': pointId,
    //       'province': province,
    //       'distric': district,
    //       'address': address
    //     }
    //   }).then(() => {
    //     alert("Tạo user thành công")
    //     window.location.reload();
    //   })
    // } else {
    //   alert("Mật khẩu nhập lại chưa đúng")
    // }

  };

  const handleProvinceChange = (event) => {
    const selectedProvinceValue = event.target.value;
    setProvince(selectedProvinceValue);

    // Find the corresponding DTK for the selected province
    const selectedProvinceInfo = PandD.find(item => item.province === selectedProvinceValue);
    if (selectedProvinceInfo) {
      setDTK(selectedProvinceInfo.dtk);
    }
  };

  const back = () => {
    navigate(-1);
  }
  return (
    <>
      <Card className='col-md-9'>
        <Button className="btn-round btnBack" color="danger" type="button" onClick={back}>
          Quay lại
        </Button>
        <div>
      </div>
        <CardBody>
          <CardTitle className="my-form-title">TẠO MỚI</CardTitle>
          <Form onSubmit={handleSubmit}>
            <div className="form-row">
              <FormGroup className='col-md-6'>
                <label htmlFor="point_name">Tên Điểm Tập Kết</label>
                <Input
                  id="point_name"
                  placeholder={pointName}
                  onChange={async (event) => {
                    const capitalizedValue = await capitalize(event.target.value);
                    setPointName(capitalizedValue);
                  }}
                  onBlur={async (event) => {
                    const capitalizedValue = await capitalize(event.target.value);
                    event.target.value = capitalizedValue;
                  }}
                  required
                ></Input>
              </FormGroup>
            </div>
              
            <div className='form-row'>
            
              <FormGroup className='col-md-3'>
                <div className="label">Tỉnh thành</div>
                <Input
                  id="inputState" type="select" 
                  defaultValue=""
                  required
                  onChange={handleProvinceChange}
                >
                  <option value="" disabled>Chọn...</option>
                  {PandD.map((item, index) => (
                    <option key={`province-${index}`} value={item.province}>
                      {item.province}
                    </option>
                  ))}
                    
                </Input>
              </FormGroup>
              {/* <FormGroup className='col-md-4'>
                <div className="label">Quận huyện</div>
                <Input
                  id="inputState"
                  type="select"
                  onChange={async (event) => { setDistrict(event.target.value) }}
                  defaultValue=""
                  required
                >
                <option value="" disabled >Chọn...</option>
                {province &&
                  PandD.find((item) => item.province === province)?.district.map((district, index) => (
                    <option key={`district-${index}`} value={district}>
                      {district}
                    </option>
                  ))}
                </Input>
              </FormGroup> */}
              {/* <FormGroup className='col-md-5'>
                <label htmlFor="center_id">Điểm Tập Kết</label>
                <Input
                  readOnly
                  id="center_id"
                  placeholder={DTK}
                  type="text"
                  onChange={(event) => { 
                    setDTK(event.target.value) 
                  }}
                  required
                ></Input>
              </FormGroup> */}
            </div>
            <div className='form-row'>
              <FormGroup className="col-md-6">
                  <label htmlFor="inputAddress">Địa chỉ cụ thể</label>
                  <Input id="inputAddress" placeholder={address} type="address" onChange={(event) => { setAddress(event.target.value) }} required
                  ></Input>
                </FormGroup>
            </div>
          
            <Button
              color="danger"
              className="btn-round"
              type="submit"
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
    "district": [
      "Lục Ngạn", 
      "Lục Nam", 
      "Yên Thế", 
      "Lạng Giang", 
      "Yên Dũng"
      ],
    "dtk": "Điểm tập kết tại: 111 Lê Lợi, Lê Hoàn, Bắc Giang"
      
  },
  {	
      "province": "Bắc Ninh", 
      "district": 
      [
      "Tiên Du", 
      "Yên Phong", 
      "Quế Võ", 
      "Thuận Thành"
      ],
      "dtk": "Điểm tập kết tại: 173 Quốc Tử Giám, Đống Đa, Bắc Ninh"
      
  }
]

export default LeaderCreateDTK;