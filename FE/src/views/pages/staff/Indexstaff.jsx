import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom'
import StaffHome from "./StaffHome";
import FromKH from "./fromKH";


 const IndexFromKH = () => (
  <>
    <StaffHome/>
    <div className="spaceHeader"></div>
      <div className="bodyContainer">
          <Outlet/>
      </div>

  </>
)
export default IndexFromKH