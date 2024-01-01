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
  { field: 'fullname', headerName: 'Full name', width: 130 },
  { field: 'phone', headerName: 'Phone', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'typeAccount', headerName: 'Type', width: 200 },
  { field: 'username', headerName: 'User Name', width: 200 },
  {
    field: 'action',
    headerName: '',
    width: 200,
    renderCell: () => <Button className="btn-round" color="danger" type="button" to="/leader/editdtk" tag={Link}>Chỉnh sửa</Button>,
  },
];

const rows = [
  { email: 1, fullname: 'Snow', firstName: 'Jon', age: 35 },
  { email: 2, fullname: 'Snow', firstName: 'Jon', age: 35 },
];


  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3377/v1/transaction-points`).then((res) => {
      console.log('data2', res.data)
      setTransactionPoint(res.data)
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
