import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { findCuocPhi } from './findCuocPhi'


const TableCuocPhi = (type, weight, size) => {
  const method = [
    {
      name: 'Hỏa tốc, hẹn giờ',
      w: 2.9,
      t: '1 ngày'
    },
    {
      name: 'Chuyển phát nhanh',
      w: 1.5,
      t: '1.5 ngày'
    },
    {
      name: 'TMĐT Tiết Kiệm',
      w: 1.1,
      t: '2.5 ngày'
    }
  ]
  return (
    <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên dịch vụ</TableCell>
            <TableCell>Giá cước</TableCell>
            <TableCell>Thời Gian</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {method.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{findCuocPhi(row.w, type, weight, size)}</TableCell>
              <TableCell>{row.t}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default TableCuocPhi