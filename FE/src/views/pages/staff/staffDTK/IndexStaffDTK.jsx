import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom'
import StaffDTKHome from "./StaffDTKHome";


 const IndexStaffDTK = () => (
  <>
    <StaffDTKHome/>
    <div className="spaceHeader"></div>
      <div className="bodyContainer">
          {/* <Outlet/> */}
      </div>

  </>
)
export default IndexStaffDTK