import { useEffect, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  NavLink
} from "reactstrap";
import { Link } from 'react-router-dom';


function ListDTK() {
const columns = [
  { field: 'name', headerName: 'Tên', width: 430 },
  { field: 'streetAddress', headerName: 'Đường', width: 200 },
  { field: 'city', headerName: 'Quận huyện', width: 200 },
  { field: 'province', headerName: 'Tỉnh thành', width: 100 },
  { field: 'warehousePointId', headerName: 'ID', width: 200 },
  {
    field: 'action',
    headerName: '',
    width: 200,
    renderCell: () => <Button className="btn-round" color="danger" type="button" to="/leader/editdtk" tag={Link}>Chỉnh sửa</Button>,
  },
];


  const [warehousePoint, setWarehousePoint] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3377/v1/warehouse-points`).then((res) => {
      console.log('data2', res.data)
      setWarehousePoint(res.data)
    })
  }, [])
  return (
    <div>
      <h1></h1>
      <h3>
        Danh sách các Điểm Tập Kết
        <span style={{ marginLeft: '600px'}}>
            <Button className="btn-round createButton" color='danger' type="button" to="/leader/createDTK" tag={Link}>
              Tạo mới
            </Button>
          </span>
        </h3>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={warehousePoint}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  )

}

export default ListDTK
