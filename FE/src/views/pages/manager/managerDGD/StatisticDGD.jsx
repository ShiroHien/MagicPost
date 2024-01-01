import React, { useState, useEffect } from "react";
import TKDiemTK from "../../../../pages/dashboard/ThongKe/TKDiemTK";
import TKKhachGuiGD from "../../../../pages/dashboard/ThongKe/TKKhachGuiGD";
import StaffDGD from "../../../../pages/dashboard/ThongKe/StaffDGD";


 const StatisticDGD = () => (
  <>
    THỐNG KÊ ĐƠN HÀNG TRONG TUẦN (TỪ NGÀY .. ĐẾN NGÀY ...)
    
    TẠI ĐIỂM GIAO DỊCH ...
    <div className="spaceHeader"></div>
      <div className="bodyContainer">
          <StaffDGD />
      </div>

  </>
)
export default StatisticDGD