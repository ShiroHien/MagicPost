import React, { useState, useEffect } from "react";
import TKDiemTK from "../../../pages/dashboard/ThongKe/TKDiemTK";
import TKDaGuiGD from "../../../pages/dashboard/ThongKe/TKDaGuiGD";


 const StaffStatistic = () => (
  <>
    THỐNG KÊ ĐƠN HÀNG TRONG TUẦN (TỪ NGÀY .. ĐẾN NGÀY ...)
    
    TẠI ĐIỂM GIAO DỊCH ...
    <div className="spaceHeader"></div>
      <div className="bodyContainer">
          <TKDaGuiGD />
      </div>

  </>
)
export default StaffStatistic