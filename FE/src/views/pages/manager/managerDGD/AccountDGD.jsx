import { useEffect, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import {
  Button,
  NavLink
} from "reactstrap";

function AccountDGD() {

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
    renderCell: () => <Button className="btn-round" color="danger" type="button" to="/leader/editaccount" >Chỉnh sửa</Button>,
  },
];



  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3377/v1/accounts/gdvdgd`).then((res) => {
      console.log('data2', res.data)
      setUser(res.data)
    })
  }, [])
  return (
    <div>
      <h3>
        Tài khoản nhân viên Điểm Giao Dịch
        <span style={{ marginLeft: '600px'}}>
            <Button className="btn-round createButton" color='danger' type="button" to="/managerDGD/createacc" tag={Link}>
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


export default AccountDGD
