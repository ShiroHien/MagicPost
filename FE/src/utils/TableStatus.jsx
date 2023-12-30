import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid } from '@mui/material'
import React from "react"
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
const TableStatus = (statuses) => {
  return (
    <TableContainer component={Paper} sx={{ margin: '20px' }}>
      Thông tin vận đơn
      {statuses.map((status) => (
        // eslint-disable-next-line react/jsx-key
        <Table>
          <TableHead>
            <FormatListNumberedIcon/>  Thông tin chi tiết vận đơn
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
      ))
      }
    </TableContainer>
  )
}
export default TableStatus