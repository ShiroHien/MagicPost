import { useEffect, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  NavLink
} from "reactstrap";
import { Link } from 'react-router-dom';


function AccountDTK() {

const columns = [
  { field: 'fullname', headerName: 'Họ tên', width: 230 },
  { field: 'phone', headerName: 'Điện thoại', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'typeAccount', headerName: 'Type', width: 230 },
  { field: 'username', headerName: 'Tên người dùng', width: 200 },
  {
    field: 'action',
    headerName: '',
    width: 200,
    renderCell: () => <Button className="btn-round" color="danger" type="button" to="/managerDTK/editaccount">Chỉnh sửa</Button>,
  },
];

const rows = [
  { email: 1, fullname: 'Snow', firstName: 'Jon', age: 35 },
  { email: 2, fullname: 'Snow', firstName: 'Jon', age: 35 },
];


  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3377/v1/accounts/nvdtk`).then((res) => {
      console.log('data2', res.data)
      setUser(res.data)
    })
  }, [])
  return (
    <div>
      <h3>
        Tài khoản nhân viên Điểm Tập Kết
        <span style={{ marginLeft: '600px'}}>
            <Button className="btn-round createButton" color='danger' type="button" to="/managerDTK/createacc" tag={Link}>
              Cấp tài khoản
            </Button>
          </span>

        </h3>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.email}
          rows={user}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  )
}


export default AccountDTK
