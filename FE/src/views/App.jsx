import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "./pages/landing/Index";
import Home from "./pages/landing/Home";
import Search from "./pages/landing/search/Search";
import Services from "./pages/landing/Services";
import FromKH from "./pages/staff/fromKH";
import Indexstaff from "./pages/staff/Indexstaff";
import StaffHome from "./pages/staff/StaffHome";
import StaffAccount from "./pages/staff/StaffAccount";
import FromDTK from "./pages/staff/FromDTK";
import IndexLeader from "./pages/leader/IndexLeader";
import LeaderAccount from "./pages/leader/LeaderAccount";
import LeaderDashboard from "./pages/leader/LeaderDashBoard";
import ThongKe from "../pages/dashboard/ThongKe";
import StaffStatistic from "./pages/staff/StaffStatistic";
import IndexmanagerDTK from "./pages/manager/managerDTK/IndexmanagerDTK";
import AccountDTK from "./pages/manager/managerDTK/AccountDTK";
import StatisticDTK from "./pages/manager/managerDTK/StatisticDTK";
import IndexmanagerDGD from "./pages/manager/managerDGD/IndexmanagerDGD";
import StatisticDGD from "./pages/manager/managerDGD/StatisticDGD";
import AccountDGD from "./pages/manager/managerDGD/AccountDGD";
import ManagerDGDHome from "./pages/manager/managerDGD/ManagerDGDHome";
import ManagerDTKHome from "./pages/manager/managerDTK/ManagerDTKHome";
import Login from "./pages/Login";

export const App = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index />} >
                <Route index element={<Home />}/>
                <Route path="search" element={<Search />}/>
                <Route path="services" element={<Services />}/>
                <Route path="login" element={<Login />}/>

            </Route>

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
                <Route path="statistics" element={<StaffStatistic />}/>
            </Route>

            <Route path="managerDTK" element={<IndexmanagerDTK />}>
                <Route index element={<ManagerDTKHome  />}/>
                <Route path="account" element={<AccountDTK />} />
                <Route path="statistics" element={<StatisticDTK />}/>
            </Route>
            
            <Route path="managerDGD" element={<IndexmanagerDGD />}>
                <Route index element={<ManagerDGDHome  />}/>
                <Route path="account" element={<AccountDGD />} />
                <Route path="statistics" element={<StatisticDGD />}/>
            </Route>
            
        </Routes>

    </BrowserRouter >
    )
}


