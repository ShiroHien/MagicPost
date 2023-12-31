import { useEffect, useState } from 'react'
import axios from 'axios'
import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'


function ListDTK() {
  const columns = [
    { field: '_id', headerName: 'ID', width: 130 },
    { field: 'city', headerName: 'Quận/Huyện', width: 130 },
    { field: 'province', headerName: 'Tỉnh', width: 200 },
    { field: 'name', headerName: 'Tên điểm', width: 200 },
    { field: 'country', headerName: 'Quốc gia', width: 200 },
    //{ field: 'username', headerName: 'User Name', width: 200 }, Sau nếu cần chỉnh api để up thêm trưởng điểm là ai, gồm nhân viên nào
    {
      field: 'action',
      headerName: '',
      width: 200,
      renderCell: () => <Button>Chỉnh sửa</Button>
    }
  ]


  const [transactionPoint, setTransactionPoint] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3377/v1/warehouse-points`).then((res) => {
      console.log('data2', res.data)
      setTransactionPoint(res.data)
    })
  }, [])
  return (
    <div>
      <h1></h1>
      <h2>Danh sách các Điểm Tập Kết</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={transactionPoint}
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
