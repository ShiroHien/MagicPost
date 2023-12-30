import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const TableStatus = (status) => {
  
  return (
    <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Thời gian</TableCell>
            <TableCell>Vị trí</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {status.map((status) => (
            <TableRow key= {status[0]}>
              <TableCell>{status[0]}</TableCell>
              <TableCell>{status[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default TableStatus