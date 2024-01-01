import React, { useState, useEffect } from "react";
import TKDiemTK from "../../../../pages/dashboard/ThongKe/TKDiemTK";


 const StatisticDTK = () => (
  <>
    <h5>THỐNG KÊ ĐƠN HÀNG TRONG TUẦN </h5>
    <div className="spaceHeader"></div>
    <div className="bodyContainer">
        <TKDiemTK />
    </div>

  </>
)
export default StatisticDTK