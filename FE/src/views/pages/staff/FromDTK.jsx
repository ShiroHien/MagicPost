import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  GridActionsCellItem,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from '@mui/x-data-grid-pro';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf'
import { useRef } from 'react'
import React, { useEffect, useState } from 'react'
// import Cookies from 'js-cookie';
// import axiosInstance from 'functions/AxiosInstance';
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  Button,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  InputGroup,
} from "reactstrap";
// import './FromDTK.css'
import InfoIcon from '@mui/icons-material/Info';
// import { Button } from '@mui/material';

function FromDTK() {

  const listOrder = [
    {
      "ID": "658bd1a54e4620f67f9f507d",
      "senderName": "Nguyễn Thảo Hiền",
      "senderPhone": "0945884888",
      "receiverName": "Đinh Thị Trà My",
      "receiverPhone": "0359276235",
      "receiverAddress": "111 Lý Thái Tổ, Bắc Giang",
      "type": "Letter",
      "selected": "False"
      
    },
    {
      "ID": "658bd1a54e4620f67f9f507e",
      "senderName": "Nguyễn Thảo Hiền",
      "senderPhone": "0945884888",
      "receiverName": "Đinh Thị Trà My",
      "receiverPhone": "0359276235",
      "receiverAddress": "70 Nghĩa Đồng, Lục Nam, Bắc Giang",
      "type": "Letter",
      "selected": "False"
    },
    {
      "ID": "658bd1a54e4620f67f9f507f",
      "senderName": "Nguyễn Thảo Hiền",
      "senderPhone": "0945884888",
      "receiverName": "Đinh Thị Trà My",
      "receiverPhone": "0359276235",
      "receiverAddress": "70 Nghĩa Đồng, Nghĩa Hưng, Nam Định",
      "type": "Letter",
      "selected": "False"
    },
    {
      "ID": "658bd1a54e4620f67f9f5080",
      "senderName": "Nguyễn Thảo Hiền",
      "senderPhone": "0945884888",
      "receiverName": "Đinh Thị Trà My",
      "receiverPhone": "0359276235",
      "receiverAddress": "70 Nghĩa Đồng, Nghĩa Hưng, Bắc Giang",
      "type": "Letter",
      "selected": "False"
    }
  ]

  const [data, setData] = useState([]);
  const [dataCar, setDataCar] = useState([]);
  const [dataOwner, setDataOwner] = useState([])
  const [modal1, setModal1] = React.useState(false);
  const [senderName, setSenderName] = useState([]);
  const [senderPhone, setSenderPhone] = useState([]);
  const [receiverName, setReceiverName] = useState([]);
  const [receiverPhone, setReceiverPhone] = useState([]);
  const [receiverAddress, setReceiverAddress] = useState([]);
  const [ID, setID] = useState([]);
  const [type, setType] = useState([]);
  const [modal2, setModal2] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [detail, setDetail] = useState([]);
  const [modal3, setModal3] = React.useState(false);
  const [newOrders, setNewOrders] = useState([]);

  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => listOrder.find((row) => row.ID === id));
    setSelectedRows(selectedRowsData)
    console.log(selectedRowsData);
  };

  const handleSubmit = async (e) => {
    setModal2(true);
    e.preventDefault();
    console.log("Form submitted successfully", selectedRows);
  }

  const handleReceived = async (e) => {
    setModal3(true);
    setNewOrders(listOrder)
    e.preventDefault();
    console.log("Received successfully");
  }

  const detailRowData = (rowData) => {
    const detailRowData = rowData.map((id) => listOrder.find((row) => row.ID === id));
    setDetail(detailRowData)
  }

  const detailOrder = React.useCallback(
    (params) => () => {
      const foundOrder = listOrder.find(row => row.ID.toString() === params.id.toString());
      setDetail(foundOrder)
      console.log("yes",detail)
      setModal1(true)
    },
    [],
  );

  const columns = [
    { field: "ID", headerName: "Mã vận đơn", width: 190 },
    { field: "senderName", headerName: "Người gửi", width: 160 },
    { field: "senderPhone", headerName: "Điện thoại", width: 150 },
    { field: "receiverName", headerName: "Người nhận", width: 160 },
    { field: "receiverPhone", headerName: "Điện thoại", width: 150 },
    { field: "receiverAddress", headerName: "Địa chỉ", width: 250 },
    { field: "type", headerName: "Loại", width: 110 },
    {
      field: "action",
      type: 'actions',
      headerName: "",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
            icon={<InfoIcon />}
            label="Info"
            onClick={detailOrder(params)}
          />,
      ]
    }
    
  ];
  const excludeField = (columns, excludedField) => {
    return columns.filter(column => column.field !== excludedField);
  };
  
  const columns2 = excludeField(columns, "action");

  return (
    <div className='centerList'>
      <div>
        <h4></h4>
        <div>
        <Card>
          <CardBody>
          <CardTitle className="my-form-title" >Danh sách đơn hàng cần gửi tới Khách Hàng</CardTitle>
          <form onSubmit={handleSubmit}> 
            <Button
                color="danger"
                className="btn-round"
                type="submit">
                Tạo đơn gửi Shipper
            </Button>
            <div className="spaceHeader"></div>
          </form> 
          <form onSubmit={handleReceived}> 
            <Button
                color="danger"
                className="btn-round"
                type="submit">
                Nhận đơn từ Điểm Tập Kết
            </Button>
            <div className="spaceHeader"></div>
          </form> 
          </CardBody>
        </Card>
         
        </div>
      </div>
      <div style={{ height: 600, width: '100%' }} className='centerList'>
        <DataGrid
          rows={listOrder}
          columns={columns}
          getRowId={(row) => row.ID}
          checkboxSelection
          onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        />
      </div>

      <Modal isOpen={modal1} toggle={() => setModal1(false)} className="modal-lg">
        <div className="modal-header justify-content-center">
          <h4 className="title title-up">
            Thông tin chi tiết đơn hàng
          </h4>
        </div>
        <ModalBody>
          <div>
            <div className="infoLine">
              <div style={{ height: 300, width: '100%' }} className='centerList'>
              
                <table className="listOrders">
                  <tr>
                    <th>Mã vận đơn</th>
                    <th>Người gửi</th>
                    <th>Điện thoại</th>
                    <th>Người nhận</th>
                    <th>Điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Loại</th>
                  </tr>
                  <tbody>
                    <td>{detail.ID}</td>
                    <td>{detail.senderName}</td>
                    <td>{detail.senderPhone}</td>
                    <td>{detail.receiverName}</td>
                    <td>{detail.receiverPhone}</td>
                    <td>{detail.receiverAddress}</td>
                    <td>{detail.type}</td>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </ModalBody>
        <div className="modal-footer">
          <span></span>
          <Button
            color="danger"
            type="button"
            onClick={() => setModal1(false)}
          >
            Close
          </Button>
        </div>
      </Modal>

      <Modal isOpen={modal2} toggle={() => setModal2(false)} className="modal-lg">
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
              <div style={{ height: 600, width: '100%' }} className='centerList'>
                <table className="listOrders">
                  <tr>
                    <th>Mã vận đơn</th>
                    <th>Người gửi</th>
                    <th>Điện thoại</th>
                    <th>Người nhận</th>
                    <th>Điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Loại</th>
                  </tr>
                  <tbody>
                  {selectedRows.map((rowData) => (
                    <tr key={rowData}>
                      <td>{rowData.ID}</td>
                      <td>{rowData.senderName}</td>
                      <td>{rowData.senderPhone}</td>
                      <td>{rowData.receiverName}</td>
                      <td>{rowData.receiverPhone}</td>
                      <td>{rowData.receiverAddress}</td>
                      <td>{rowData.type}</td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </div>
          </div>
          </PDFExport>
        </ModalBody>
        <div className="modal-footer">
          <Button
            color="danger"
            type="button"
            onClick={handleExportWithComponent}
          >
            Xuất hóa đơn
          </Button>
          <Button
            color="danger"
            type="button"
            onClick={() => {
              setModal2(false);
              window.location.reload() 
            }}
          >
            Close
          </Button>
        </div>
      </Modal>

      <Modal isOpen={modal3} toggle={() => setModal2(false)} className="modal-lg">
        <div className="modal-header justify-content-center">
          <h4 className="title title-up">
            Danh sách đơn gửi từ Điểm Tập Kết
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
              <div style={{ height: 600, width: 600 }} className='centerList'>
                <table className="listOrders">
                  <tr>
                    <th>Mã vận đơn</th>
                    <th>Người gửi</th>
                    <th>Điện thoại</th>
                    <th>Người nhận</th>
                    <th>Điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Loại</th>
                  </tr>
                  <tbody>
                  {selectedRows.map((rowData) => (
                    <tr key={rowData}>
                      <td>{rowData.ID}</td>
                      <td>{rowData.senderName}</td>
                      <td>{rowData.senderPhone}</td>
                      <td>{rowData.receiverName}</td>
                      <td>{rowData.receiverPhone}</td>
                      <td>{rowData.receiverAddress}</td>
                      <td>{rowData.type}</td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </div>
          </div>
        </ModalBody>
        <div className="modal-footer">
          <Button
            color="danger"
            type="button"
            onClick={() => {
              setModal2(false);
              window.location.reload() 
            }}
          >
            Đã nhận
          </Button>
          <Button
            color="danger"
            type="button"
            onClick={() => {
              setModal2(false);
              listOrder.concat(newOrders)
              console.log(listOrder)
              window.location.reload() 
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default FromDTK;