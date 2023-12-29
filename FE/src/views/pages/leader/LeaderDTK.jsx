import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom'
import TKDiemTK from "../../../pages/dashboard/ThongKe/TKDiemTK";
import ListDTK from "./ListDTK";


 const LeaderDTK = () => (
  <>
    <TKDiemTK/>
    <div className="spaceHeader"></div>
      <div className="bodyContainer">
        <ListDTK/>
      </div>

  </>
)
export default LeaderDTK