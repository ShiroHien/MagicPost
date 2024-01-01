import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import TKDiemTK from '../../../pages/dashboard/ThongKe/TKDiemTK'
import ListDGD from './ListDGD'


const LeaderDGD = () => (
  <>
    {/* <TKDiemTK/> */}
    <div className='spaceHeader'></div>
    <div className='bodyContainer'>
      <ListDGD/>
    </div>

  </>
)
export default LeaderDGD