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
// import axiosInstance from "functions/AxiosInstance";
// import getAreaByProvince from 'functions/getAreaByProvince';
// import capitalize from 'functions/captalized';

function CreateAccDTK() {
  const [rank, setRank] = useState("")
  const [account, setAccount] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [pointName, setPointName] = useState("")
  const [managerName, setManagerName] = useState("")
  const [pointId, setPointId] = useState("")
  const [province, setProvince] = useState("")
  const [district, setDistrict] = useState("")
  const [address, setAddress] = useState("")

  const navigate = useNavigate();

  let checkPassword = () => {
    if (repeatPassword === password) {
      return true;
    } else {
      return false;
    }
  }
  
  
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
          <CardTitle className="my-form-title">Tạo tài khoản nhân viên tập kết</CardTitle>
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
                  id="inputPassword4"
                  placeholder={password}
                  type="password"
                  onChange={(event) => { setPassword(event.target.value) }}
                  required
                ></Input>
              </FormGroup>
              <FormGroup className="col-md-4">
                <label htmlFor="inputReenterPassword4">Nhập lại mật khẩu</label>
                <Input
                  id="inputReenterPassword4"
                  placeholder={repeatPassword}
                  type="password"
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
              {/* <FormGroup className='col-md-4'>
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
              </FormGroup> */}
            </div>
            {/* <div className='form-row'>
              <FormGroup className='col-md-5'>
                <div className="label">Tỉnh thành</div>
                <Input
                  id="inputState" type="select" onChange={async (event) => { setProvince(event.target.value) }}
                  defaultValue=""
                  required
                >
                  <option value="" disabled>Chọn...</option>
                  {PandD.map((item, index) => (
                    <option key={`province-${index}`} value={item.province}>
                      {item.province}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup className='col-md-6'>
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
           */}
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

export default CreateAccDTK;