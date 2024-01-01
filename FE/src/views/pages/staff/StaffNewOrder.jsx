import React from 'react'
// import FixedNavbarUser from "components/Navbars/FixedNavbarUser";
import './StaffNewOrder.css'
import { useState } from "react";
import { PDFExport, savePDF } from '@progress/kendo-react-pdf'
import { useRef } from 'react'
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalBody,
  InputGroup,
  Label,
} from "reactstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'js-cookie';
// import axiosInstance from "functions/AxiosInstance";
// import getPlates from "functions/getPlates";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import capitalize from 'functions/captalized';
import {FormatDate, IsDateBeforeToday, AddMonthsToDate } from '../../../functions/caculateDate';
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

function StaffNewOrder() {
  const [senderName, setSenderName] = useState([])
  const [senderPhone, setSenderPhone] = useState([])
  const [senderStreet, setSenderStreet] = useState([])
  const [senderCity, setSenderCity]= useState([])
  const [senderProvince, setSenderProvince]= useState([])
  const [receiverName, setReceiverName]= useState([])
  const [receiverPhone, setReceiverPhone]= useState([])
  const [receiverStreet, setReceiverStreet]= useState([])
  const [receiverCity, setReceiverCity]= useState([])
  const [receiverProvince, setReceiverProvince]= useState([])
  const [type, setType]= useState([])
  const [weight, setWeight]= useState([])
  const [size, setSize]= useState([])
  const [postage, setPostage]= useState([])
  const [createAt, setCreateAt]= useState([])

  const [listOfPlates, setListOfPlates] = useState([])

  const [numberPlate, setNumberPlate] = useState("")
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [carName, setCarName] = useState("")
  const [brand, setBrand] = useState("")
  const [province, setProvince] = useState("")
  const [dateRegistered, setDateRegistered] = useState("")
  const [purposeOfUse, setPurposeOfUse] = useState("")
  const [lastDateExpired, setLastDateExpired] = useState("")
  const [status, setStatus] = useState("")

  const [ownerName, setOwnerName] = useState("")
  const [typeOfOwnership, setTypeOfOwnership] = useState("")
  const [ownerId, setOwnerId] = useState("")
  const [ownerAddress, setOwnerAddress] = useState("")
  const [contactNumber, setContactNumber] = useState("")

  const [selectedDate, setSelectedDate] = useState(null);
  const [dateString, setDateString] = useState("")
  const [dateExpire, setDateExpire] = useState(null)
  const [registryCode, setRegistryCode] = useState("");
  const [time, setTime] = useState(6)

  const [isValidInput, setIsValidInput] = useState(true);
  const [modal1, setModal1] = React.useState(false);

  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }


  // useEffect(() => {
  //   getRegistryCode();
  //   getListOfPlates();
  // }, [])
  // useEffect(() => {
  //   handleDisplay();
  // }, [numberPlate])

  // const getRegistryCode = async () => {
  //   let prefix = JSON.parse(Cookies.get('info')).center_id.slice(2, 6);
  //   await axiosInstance({
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: 'get',
  //     url: `http://localhost:3010/statistics/${JSON.parse(Cookies.get('info')).center_id}`,
  //   })
  //     .then((res) => {
  //       let surfix = res.data.registrations.length + 1;
  //       for (let i = 1; i <= 6 - surfix.toString().length; i++) {
  //         prefix = prefix + '0'
  //       }
  //       setRegistryCode(prefix + surfix);
  //     })
  // }

  // useEffect(() => {
  //   handleDateChange(selectedDate);

  //   // console.log("haha");
  // }, [selectedDate, time])

  // const handleDateChange = (date) => {
  //   console.log(AddMonthsToDate(FormatDate(date), time))
  //   setDateString(AddMonthsToDate(FormatDate(date), time))
  //   if (selectedDate !== null) {
  //     setDateExpire(AddMonthsToDate(FormatDate(selectedDate), time))
  //   }
  //   // console.log("sd", FormatDate(selectedDate));
  // };

  const getListOfPlates = async () => {
    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'get',
      url: `http://localhost:3010/numberPlate/getAll`,

    })
    setListOfPlates(response.data.result);
  }
  const handleDisplay = async () => {
    console.log(isValidInput);
    if (numberPlate && isValidInput) {
      let response = await axiosInstance({
        headers: {
          "Content-Type": "application/json",
        },
        method: 'get',
        url: `http://localhost:3010/carInfo/getByNumberPlate/${numberPlate}`,
      })
      setRegistrationNumber(response.data.car.registration_number)
      setCarName(response.data.car.car_name)
      setBrand(response.data.car.brand)
      setProvince(response.data.car.province)
      setDateRegistered(response.data.car.date_registered)
      setPurposeOfUse(response.data.car.purpose_of_use)
      setLastDateExpired(response.data.date_expired)
      IsDateBeforeToday(response.data.date_expired) ?
        setStatus("Hết hạn")
        : setStatus("Chưa hết hạn")

      setOwnerName(response.data.owner.owner_name)
      setTypeOfOwnership(response.data.owner.type_of_ownership)
      setOwnerId(response.data.owner.owner_id)
      setOwnerAddress(response.data.owner.owner_address)
      setContactNumber(response.data.owner.contact_number)
    }
    else {
      setRegistrationNumber("")
      setCarName("")
      setBrand("")
      setProvince("")
      setDateRegistered("")
      setPurposeOfUse("")
      setLastDateExpired("")

      setOwnerName("")
      setTypeOfOwnership("")
      setOwnerId("")
      setOwnerAddress("")
      setContactNumber("")
    }
  }
  const handleSubmit = async (e) => {
    setModal1(true);
    e.preventDefault();

    let response = await axiosInstance({
      headers: {
        "Content-Type": "application/json",
      },
      method: 'post',
      url: `http://localhost:3010/registry/update`,
      data: {
        "registration_number": registrationNumber,
        "number_plate": numberPlate,
        "owner_name": ownerName,
        "owner_id": ownerId,
        "date_issued": FormatDate(selectedDate),
        "date_expired": dateString,
        "center_name": JSON.parse(Cookies.get('info')).center_name,
        "center_id": JSON.parse(Cookies.get('info')).center_id,
        "registry_code": registryCode
      }
    })
      .then(() => {
      })
  }

  const checkValidInput = (newInputValue) => {
    var result = listOfPlates.find(function (element) {
      return element.number_plate === newInputValue;
    })
    return result;
  }

  return (
    <>
      {/* <FixedNavbarUser /> */}
      <div className="spaceHeader"></div>
      {/* Sender and receiver's info */}
      <div className="form-row">
        <Card className="col-md-6">
          <CardBody>
            <CardTitle className="my-form-title">Thông tin người gửi</CardTitle>
            <Form>
              <div className="form-row">
                <FormGroup className="col-md-7">
                  <label htmlFor="sender_name">Tên người gửi</label>
                  <Input
                    id="sender_name"
                    placeholder={senderName}
                    onChange={async (event) => {
                      const capitalizedValue = await capitalize(event.target.value);
                      setSenderName(capitalizedValue);
                    }}
                    onBlur={async (event) => {
                      const capitalizedValue = await capitalize(event.target.value);
                      event.target.value = capitalizedValue;
                    }}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup className="col-md-4">
                  <label htmlFor="sender_phone">Số điện thoại</label>
                  <Input
                    id="sender_phone"
                    placeholder={senderPhone}
                    onChange={async (event) => {
                      const capitalizedValue = await capitalize(event.target.value);
                      setSenderPhone(capitalizedValue);
                    }}
                    onBlur={async (event) => {
                      const capitalizedValue = await capitalize(event.target.value);
                      event.target.value = capitalizedValue;
                    }}
                    required>
                  </Input>
                </FormGroup>
                <FormGroup className='col-md-4'>
                  <label For="province">Tỉnh thành</label>
                  <Input
                    type="select" name="select" id="exampleSelect" onChange={async (event) => { setSenderProvince(event.target.value) }}
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
                <FormGroup className='col-md-4'>
                  <label htmlFor="district">Quận huyện</label>
                  <Input
                    id="inputState"
                    type="select"
                    onChange={async (event) => { setSenderCity(event.target.value) }}
                    defaultValue=""
                    required
                  >
                  <option value="" disabled>Chọn...</option>
                  {province &&
                    PandD.find((item) => item.province === province)?.district.map((district, index) => (
                      <option key={`district-${index}`} value={district}>
                        {district}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup className="col-md-4">
                    <label htmlFor="sender_street">Số đường</label>
                    <Input
                      id="sender_street"
                      placeholder={senderStreet}
                      onChange={async (event) => {
                        const capitalizedValue = await capitalize(event.target.value);
                        setSenderStreet(capitalizedValue);
                      }}
                      onBlur={async (event) => {
                        const capitalizedValue = await capitalize(event.target.value);
                        event.target.value = capitalizedValue;
                      }}
                      required>
                    </Input>
                  </FormGroup>
              </div>
              
            </Form>
          </CardBody>
        </Card >

        <Card className="col-md-6">
          <CardBody>
            <CardTitle className="my-form-title">Thông tin người nhận</CardTitle>
            <Form>
              <div className="form-row">
                <FormGroup className="col-md-7">
                  <label htmlFor="receiverName">Tên người nhận</label>
                  <Input
                    id="receiverName"
                    placeholder={receiverName}
                    onChange={async (event) => {
                      const capitalizedValue = await capitalize(event.target.value);
                      setReceiverName(capitalizedValue);
                    }}
                    onBlur={async (event) => {
                      const capitalizedValue = await capitalize(event.target.value);
                      event.target.value = capitalizedValue;
                    }}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup className="col-md-4">
                  <label htmlFor="receiver_phone">Số điện thoại</label>
                  <Input
                    id="receiver_phone"
                    placeholder={receiverPhone}
                    onChange={async (event) => {
                      const capitalizedValue = await capitalize(event.target.value);
                      setReceiverPhone(capitalizedValue);
                    }}
                    onBlur={async (event) => {
                      const capitalizedValue = await capitalize(event.target.value);
                      event.target.value = capitalizedValue;
                    }}
                    required>
                  </Input>
                </FormGroup>
                <FormGroup className='col-md-4'>
                  <label htmlFor="province">Tỉnh thành</label>
                  <Input
                    id="inputState" type="select" onChange={async (event) => { setReceiverProvince(event.target.value) }}
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
                <FormGroup className='col-md-4'>
                  <label htmlFor="district">Quận huyện</label>
                  <Input
                    id="inputState"
                    type="select"
                    onChange={async (event) => { setReceiverCity(event.target.value) }}
                    defaultValue=""
                    required
                  >
                  <option value="" disabled>Chọn...</option>
                  {province &&
                    PandD.find((item) => item.province === province)?.district.map((district, index) => (
                      <option key={`district-${index}`} value={district}>
                        {district}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup className="col-md-4">
                    <label htmlFor="receiver_street">Số đường</label>
                    <Input
                      id="receiver_street"
                      placeholder={receiverStreet}
                      onChange={async (event) => {
                        const capitalizedValue = await capitalize(event.target.value);
                        setReceiverStreet(capitalizedValue);
                      }}
                      onBlur={async (event) => {
                        const capitalizedValue = await capitalize(event.target.value);
                        event.target.value = capitalizedValue;
                      }}
                      required>
                    </Input>
                  </FormGroup>
              </div>
            </Form>
          </CardBody>
        </Card >
      </div >

      <Card>
        <CardBody>
          <CardTitle className="my-form-title">Thông tin đơn hàng</CardTitle>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <FormGroup className="col-md-2">
                <label htmlFor="type_of_ownership">Ngày giờ gửi</label>
                <InputGroup>
                  <DatePicker
                    selected={selectedDate}
                    // onChange={(event) => setSelectedDate(event.target.value)}
                    // onChange={handleDateChange}
                    onChange={
                      setSelectedDate
                      // setDateNewRegistry(selectedDate.getDate() + "/" + selectedDate.getMonth() + "/" + selectedDate.getFullYear())
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText="dd/mm/yyyy"
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className='col-md-2'>
                  <label htmlFor="type">Loại hàng</label>
                  <Input
                    id="inputState" type="select" onChange={async (event) => { setType(event.target.value) }}
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>Chọn...</option>
                    {Type.map((item, index) => (
                      <option key={`label-${index}`} value={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup className="col-md-2">
                    <label htmlFor="weight">Cân nặng (Kg)</label>
                    <Input
                      id="weight"
                      placeholder={weight}
                      onChange={async (event) => {
                        const capitalizedValue = await capitalize(event.target.value);
                        setWeight(capitalizedValue);
                      }}
                      onBlur={async (event) => {
                        const capitalizedValue = await capitalize(event.target.value);
                        event.target.value = capitalizedValue;
                      }}
                      required>
                    </Input>
                  </FormGroup>
                  <FormGroup className="col-md-2">
                    <label htmlFor="size">Kích thước (cm)</label>
                    <Input
                      id="size"
                      placeholder={size}
                      onChange={async (event) => {
                        const capitalizedValue = await capitalize(event.target.value);
                        setSize(capitalizedValue);
                      }}
                      onBlur={async (event) => {
                        const capitalizedValue = await capitalize(event.target.value);
                        event.target.value = capitalizedValue;
                      }}
                      required>
                    </Input>
                  </FormGroup>
                  <FormGroup className="col-md-2">
                    <label htmlFor="size">Cước phí (VND)</label>
                    <Input
                      readOnly
                      id="size"
                      placeholder={size}
                      type="text"
                    ></Input>
                  </FormGroup>
            </div>
            <Button
              color="danger"
              className="btn-round"
              type="submit">
              Tạo đơn
            </Button>
          </form>
        </CardBody>
      </Card >

      <Modal isOpen={modal1} toggle={() => setModal1(false)} className="modal-lg">
        <div className="modal-header justify-content-center">
          <h4 className="title title-up">
            Tạo đơn thành công
          </h4>
        </div>
        <ModalBody>
          <PDFExport ref={pdfExportComponent} fileName="magicpost.pdf" paperSize="A4" margin={"5 pt"} scale={0.5}>
          <div style={{ padding: '0 0' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <h1>Magic Post</h1>
              <div style={{}}>
                <p>12345</p>
                <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={'12345'}
                viewBox={`0 0 256 256`}
                />
              </div>
              
                <h1></h1>
            </div>
            </div>
              <div class="parcel-information">
                <div class="boxes">
                  <div class="box-1">
                    <div class="sender">
                      <p><b>1. Tên và địa chỉ người gửi</b></p>
                      <p>{senderName}</p>
                      <br />
                      <p>{senderStreet + " " + senderCity + " " + senderProvince}</p>
                      <div class="phone">
                        <p><b>Số điện thoại: </b>{senderPhone}</p>
                        <div class="code">
                          <p><b>Customer Id: </b> 02932131</p>
                          <p><b>Mã bưu chính: </b> 1000</p>
                        </div>
                      </div>
                    </div>
                    <div class="receiver">
                      <p><b>2. Tên và địa chỉ người nhận</b></p>
                      <p>{receiverName}</p>
                      <br />
                      <p>{receiverStreet + " " + receiverCity + " " + receiverProvince}</p>
                      <div class="phone">
                        <p><b>Mã vận đơn: </b>SPX902829742</p>
                        <div class="code">
                          <p><b>Số điện thoại: </b> {receiverPhone}</p>
                          <p><b>Mã bưu chính:</b> 1000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="box-2">
                    <div class="parcel-type">
                        <p><b>3. Loại hàng gửi</b></p>
                        <div class="check-box-group">
                          <label class="checkBox">
                          <input
                            type="checkbox" className="input" checked={type === "Tài liệu"} disabled
                          />
                            <span class="custom-checkbox"></span>
                            Tài liệu
                          </label>
                          <label class="checkBox">
                          <input
                            type="checkbox" className="input" checked={type === "Hàng hóa"} disabled
                          />
                            <span class="custom-checkbox"></span>
                            Hàng hóa
                          </label>
                        </div>
                    </div>
                    <div class="parcel-value">
                      <p><b>4. Nội dung trị giá bưu gửi</b></p>
                      <table class="parcel-content">
                          <tr>
                            <th>Nội dung</th>
                            <th>Số lượng</th>
                            <th>Trị giá</th>
                            <th>Giấy tờ đính kèm</th>
                          </tr>
                          <tr>
                            <td>Tổng</td>
                            <td>0</td>
                            <td></td>
                            <td></td>
                          </tr>
                      </table>
                    </div>
                    <div class="parcel-service">
                      <p><b>5. Dịch vụ đặc biệt/Cộng thêm</b></p>
                      <p>Không có.</p>
                      <p>Mã hợp đồng: EMSC/PPA</p>
                    </div>
                  </div>
                  <div class="box-3">
                    <div class="sender-instruction">
                      <p><b>6. Chỉ dẫn của người gửi khi không phát được bưu gửi</b></p>
                      <div class="check-box-group">
                        <label class="checkBox">
                          <input
                            type="checkbox"
                            class="input"
                            checked="{senderInstruction.returnImmediately}"
                            disabled
                          />
                          <span class="custom-checkbox"></span>
                          Chuyển hoàn ngay
                        </label>
                        <label class="checkBox">
                          <input
                            type="checkbox"
                            class="input"
                            checked="{senderInstruction.callRecipient}"
                            disabled
                          />
                          <span class="custom-checkbox"></span>
                          Gọi điện cho người gửi
                        </label>
                        <label class="checkBox">
                          <input
                            type="checkbox"
                            class="input"
                            checked="{senderInstruction.cancel}"
                            disabled
                          />
                          <span class="custom-checkbox"></span>
                          Hủy
                        </label>
                      </div>
                      <div class="check-box-group">
                        <label class="checkBox">
                          <input
                            type="checkbox"
                            class="input"
                            checked="{senderInstruction.returnBefore}"
                            disabled
                          />
                          <span class="custom-checkbox"></span>
                          Chuyển hoàn trước ngày ...
                        </label>
                        <label class="checkBox">
                          <input
                            type="checkbox"
                            class="input"
                            checked="{senderInstruction.returnAfterStorage}"
                            disabled
                          />
                          <span class="custom-checkbox"></span>
                          Chuyển hoàn khi hết thời gian lưu trữ
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="box-4">
                    <div class="sender-commiment">
                      <p><b>7. Cam kết của người gửi</b></p>
                      <p>
                        Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan
                        bưu gửi này không chứa những mặt hàng nguy hiểm, cấm gửi.
                        Trường hợp không phát được hãy thực thi chỉ dẫn tại Mục 6, tôi
                        sẽ trả cước chuyển hoàn.
                      </p>
                    </div>
                    <div class="sender-signature">
                      <div class="date">
                        <p><b>8. Ngày giờ gửi</b></p>
                        <p>20/10/2023</p>
                      </div>
                      <div class="signature">
                        <p><b>Chữ ký người gửi</b></p>
                        <br />
                      </div>
                    </div>
                  </div>
                  <div class="box-5">
                      <div class="delivery-fare">
                        <p><b>9. Cước:</b></p>
                        <div class="fare">
                          <p>{postage}</p>
                        </div>
                      </div>
                      <div class="parcel-weight">
                        <p><b>10. Khối lượng (kg):</b></p>
                        <div class="weight">
                          <p>{weight}</p>
                        </div>
                      </div>
                      <div class="recipient-fare">
                        <p><b>11. Thu của người nhận (VND):</b></p>
                        <div class="fare">
                          <p>90000</p>
                        </div>
                      </div>
                  </div>
                  <div class="box-6">
                    <div class="parcel-note">
                      <p><b>12. Chú dẫn nghiệp vụ:</b></p>
                      <br></br>
                      <br></br>
                    </div>
                  </div>
                  <div class="box-7">
                    <div class="parcel-approval">
                      <p><b>13. Bưu cục chấp nhận</b></p>
                      <p><b>Chữ ký GDV nhận</b></p>
                      <div
                          style={{
                            position: 'relative',
                            marginTop: '1rem',
                            borderRadius: '9999px',
                            borderWidth: '2px',
                            borderColor: '#000000',
                            borderStyle: 'solid',
                            backgroundColor: 'transparent',
                            width: '138px',
                            height: '138px',
                            margin: 'auto',
                          }}
                        >
                        <svg
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                          }}
                          viewBox="0 0 100 100"
                        >
                          <path
                            id="curve"
                            d="M50,50 m-50,0 a50,50 0 1,0 100,0"
                            fill="transparent"
                          />

                          <text>
                            <textPath href="#curve" startOffset="36%">
                              129100
                            </textPath>
                          </text>

                          <text
                            x="50"
                            y="50"
                            text-anchor="middle"
                            alignment-baseline="middle"
                          >
                            12/12/2023
                          </text>

                          <text
                            x="50"
                            y="20"
                            text-anchor="middle"
                            alignment-baseline="middle"
                          >
                            
                          </text>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="box-8">
                    <div class="delivery-date">
                      <p><b>14. Ngày giờ nhận</b></p>
                      <p><b>Người nhận</b></p>
                      <p>(Ký, ghi rõ họ tên)</p>
                      <p><i> Ten nguoi nhan </i></p>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          </PDFExport>
        </ModalBody>
        <div className="modal-footer">
          <Button
            color="danger"
            type="button"
            onClick={handleExportWithComponent}>
            Xuất hóa đơn
          </Button>
          <Button
            color="danger"
            type="button"
            onClick={() => {
              setModal1(false);
              window.location.reload() }}>
            Close
          </Button>
        </div>
      </Modal>
    </> 
  )
}
const PandD = [
  {
    "province": "Bắc Giang", 
    "district": 
      [
      "Lục Ngạn", 
      "Lục Nam", 
      "Yên Thế", 
      "Lạng Giang", 
      "Yên Dũng"
      ]
  },
  {	
      "province": "Bắc Ninh", 
      "district": 
      [
      "Tiên Du", 
      "Yên Phong", 
      "Quế Võ", 
      "Thuận Thành"
      ]
  }
]

const Type = [
  {label: "Hàng hóa"},
  {label: "Tài liệu"}
];

export default StaffNewOrder;