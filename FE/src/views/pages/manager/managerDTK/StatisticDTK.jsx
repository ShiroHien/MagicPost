import React, { useState, useEffect } from "react";
import TKDiemTK from "../../../../pages/dashboard/ThongKe/TKDiemTK";


 const StatisticDTK = () => (
  <>
    THỐNG KÊ ĐƠN HÀNG TRONG TUẦN (TỪ NGÀY .. ĐẾN NGÀY ...)
    
    TẠI ĐIỂM GIAO DỊCH ...
    <div className="spaceHeader"></div>
    <div className="bodyContainer">
        <TKDiemTK />
    </div>

  </>
)
export default StatisticDTK