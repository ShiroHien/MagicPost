import TraCuuMVD from '../../components/TraCuuMVD'

import { useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { NavLink, Outlet } from 'react-router-dom'


const Search = () => {
  return (
    <>
      <TraCuuMVD />
      <UocTinhCuocPhi />
      <TimKiemBuuCuc/>
    </>
  )
}

export default Search