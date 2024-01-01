import Sidetab from './Sidebar/Sidetab'

import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Search = () => {
  const [activePage, setActivePage] = useState('')

  return (
    <>
      <div>
        <div className="bodyContainer">
          <Sidetab/>
        </div>
      </div>
    </>
    
  )
}

export default Search