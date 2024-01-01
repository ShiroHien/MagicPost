import React, { useState, useEffect } from "react";
import TKDiemTK from "../../../pages/dashboard/ThongKe/TKDiemTK";
import TKDaGuiGD from "../../../pages/dashboard/ThongKe/TKDaGuiGD";
import StaffDGD from "../../../pages/dashboard/ThongKe/StaffDGD";


 const StaffStatistic = () => (
  <>
  <h2>Thống kê trong tuần</h2>
    <div className="spaceHeader"></div>
      <div className="bodyContainer">
          <StaffDGD />
      </div>

  </>
)
export default StaffStatistic