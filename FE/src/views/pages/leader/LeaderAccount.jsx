import { useEffect, useState } from 'react'
import axios from 'axios'
import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'


function LeaderAccount() {
  const columns = [
    { field: 'fullname', headerName: 'Full name', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'typeAccount', headerName: 'Type', width: 200 },
    { field: 'username', headerName: 'User Name', width: 200 },
    {
      field: 'action',
      headerName: '',
      width: 200,
      renderCell: () => <Button>Chỉnh sửa</Button>
    }
  ]


  const [user, setUser] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3377/v1/accounts/truongdiem`).then((res) => {
      console.log('data2', res.data)
      setUser(res.data)
    })
  }, [])
  return (
    <div>
      <h1>Quản lý tài khoản trưởng điểm</h1>
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

export default LeaderAccount
