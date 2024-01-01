import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AdminDashboard from './LeaderDashBoard'


const IndexLeader = () => (
  <>
    <AdminDashboard/>
    <div className='spaceHeader'></div>
    <div className='bodyContainer'>
      {/* <Outlet/> */}
    </div>

  </>
)
export default IndexLeader