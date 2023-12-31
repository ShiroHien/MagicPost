import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import ListDTK from './ListDTK'


const LeaderDTK = () => (
  <>
    <div className='spaceHeader'></div>
    <div className='bodyContainer'>
      <ListDTK/>
    </div>
  </>
)
export default LeaderDTK