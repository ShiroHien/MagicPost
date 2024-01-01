import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf'
import { useRef } from 'react'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import axios from 'axios';
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";
import InfoIcon from '@mui/icons-material/Info';

function DTKfromDTK() {

  const [dataOrder, setDataOrder] = useState([]);
  const [modal1, setModal1] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [detail, setDetail] = useState([]);
  const [modal3, setModal3] = React.useState(false);
  const [newOrders, setNewOrders] = useState([]);

  useEffect(() => {
    axios.get('../src/assets/dataTemp/postal_goods.json').then((res) => {
      console.log('data2', res.data);
      setDataOrder(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get('../src/assets/dataTemp/DGDtoDTK.json').then((res) => {
      console.log('data2', res.data);
      setNewOrders(res.data);
    });
  }, []);

  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => dataOrder.find((row) => row.ID === id));
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
    e.preventDefault();
    console.log("Received successfully");
  }



  const detailOrder = React.useCallback(
    (params) => () => {
      const foundOrder = dataOrder.find(row => row.ID.toString() === params.id.toString());
      setDetail(selectedRows)
      console.log("yes",detail)
      setModal1(true)
    },
    [],
  );

  const columns = [
    { field: "ID", headerName: "Mã vận đơn", width: 190 },
    { field: "senderName", headerName: "Người gửi", width: 160 },
    { field: "senderPhone", headerName: "Điện thoại", width: 150 },
    { field: "senderProvince", headerName: "Địa chỉ", width: 150 },
    { field: "receiverName", headerName: "Người nhận", width: 160 },
    { field: "receiverPhone", headerName: "Điện thoại", width: 150 },
    { field: "receiverProvince", headerName: "Địa chỉ", width: 150 },
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
          <CardTitle className="my-form-title" >Danh sách đơn hàng nhận từ Điểm Tập Kết khác</CardTitle>
          <form onSubmit={handleSubmit}> 
            <Button
                color="danger"
                className="btn-round"
                type="submit">
                Tạo đơn gửi Điểm Giao Dịch
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
          rows={dataOrder}
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
              <div className='centerList'>
              <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Mã vận đơn</TableCell>
                        <TableCell>Người gửi</TableCell>
                        <TableCell>Điện thoại</TableCell>
                        <TableCell>Địa chỉ</TableCell>
                        <TableCell>Người nhận</TableCell>
                        <TableCell>Điện thoại</TableCell>
                        <TableCell>Địa chỉ</TableCell>
                        <TableCell>Loại</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedRows.map((rowData) => (
                          <TableRow key={rowData}>
                            <TableCell>{rowData.ID}</TableCell>
                            <TableCell>{rowData.senderName}</TableCell>
                            <TableCell>{rowData.senderPhone}</TableCell>
                            <TableCell>{rowData.senderProvince}</TableCell>
                            <TableCell>{rowData.receiverName}</TableCell>
                            <TableCell>{rowData.receiverPhone}</TableCell>
                            <TableCell>{rowData.receiverProvince}</TableCell>
                            <TableCell>{rowData.type}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                  </Table>
                </TableContainer>
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
              <div className='centerList'>
              <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Mã vận đơn</TableCell>
                        <TableCell>Người gửi</TableCell>
                        <TableCell>Điện thoại</TableCell>
                        <TableCell>Địa chỉ</TableCell>
                        <TableCell>Người nhận</TableCell>
                        <TableCell>Điện thoại</TableCell>
                        <TableCell>Địa chỉ</TableCell>
                        <TableCell>Loại</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedRows.map((rowData) => (
                        <TableRow key={rowData}>
                          <TableCell>{rowData.ID}</TableCell>
                          <TableCell>{rowData.senderName}</TableCell>
                          <TableCell>{rowData.senderPhone}</TableCell>
                          <TableCell>{rowData.senderProvince}</TableCell>
                          <TableCell>{rowData.receiverName}</TableCell>
                          <TableCell>{rowData.receiverPhone}</TableCell>
                          <TableCell>{rowData.receiverProvince}</TableCell>
                          <TableCell>{rowData.type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
              setDataOrder('')
            }}
          >
            Gửi
          </Button>
        </div>
      </Modal>

      <Modal isOpen={modal3} toggle={() => setModal3(false)} className="modal-lg">
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
              <div className='centerList'>
              <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Mã vận đơn</TableCell>
                        <TableCell>Người gửi</TableCell>
                        <TableCell>Điện thoại</TableCell>
                        <TableCell>Địa chỉ</TableCell>
                        <TableCell>Người nhận</TableCell>
                        <TableCell>Điện thoại</TableCell>
                        <TableCell>Địa chỉ</TableCell>
                        <TableCell>Loại</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {newOrders.map((rowData) => (
                        <TableRow key={rowData}>
                          <TableCell>{rowData.ID}</TableCell>
                          <TableCell>{rowData.senderName}</TableCell>
                          <TableCell>{rowData.senderPhone}</TableCell>
                          <TableCell>{rowData.senderProvince}</TableCell>
                          <TableCell>{rowData.receiverName}</TableCell>
                          <TableCell>{rowData.receiverPhone}</TableCell>
                          <TableCell>{rowData.receiverProvince}</TableCell>
                          <TableCell>{rowData.type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </ModalBody>
        <div className="modal-footer">
          <Button
            color="danger"
            type="button"
            onClick={() => {
              setNewOrders([])
              setModal3(false);
              setDataOrder(newOrders)
              
            }}
          >
            Đã nhận
          </Button>
          <Button
            color="danger"
            type="button"
            onClick={() => {
              setNewOrders([])
              setModal3(false);
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default DTKfromDTK;