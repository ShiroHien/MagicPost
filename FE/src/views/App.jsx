import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "./pages/landing/Index";
import Search from "./pages/landing/search/Search";
import Services from "./pages/landing/Services";
import TraCuuMVD from "./pages/landing/Search/TraCuuMVD";
import TimKiemBuuCuc from "./pages/landing/search/TimKiemBuuCuc";
import FromKH from "./pages/staff/fromKH";
import Indexstaff from "./pages/staff/Indexstaff";
import StaffHome from "./pages/staff/StaffHome";
import StaffAccount from "./pages/staff/StaffAccount";
import FromDTK from "./pages/staff/FromDTK";
import IndexLeader from "./pages/leader/IndexLeader";
import LeaderAccount from "./pages/leader/LeaderAccount";
import Statistics from "./pages/leader/statistic";
import LeaderDashboard from "./pages/leader/LeaderDashBoard";
import ThongKe from "../pages/dashboard/ThongKe";


export const App = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />}/>
                {/* <Route element={<TraCuuMVD />}/> */}
                <Route path="/search/vd" element={<TraCuuMVD />}/>
                <Route path="/search/dgd" element={<TimKiemBuuCuc />}/>
            <Route path="/services" element={<Services />}/>


            <Route path="leader" element={<IndexLeader />}>
                <Route index element={<LeaderDashboard  />}/>
                <Route path="statistics" element={<ThongKe/>} />
                <Route path="account" element={<LeaderAccount />} />
            </Route>
            
        
            <Route path="staff" element={<Indexstaff />}>
                <Route index element={<StaffHome />}/>
                <Route path="fromKH" element={<FromKH />}/>
                <Route path="account" element={<StaffAccount />} />
                <Route path="fromDTK" element={<FromDTK />}/>
            </Route>
            
            
        </Routes>
        
        
    </BrowserRouter >
    )
}


