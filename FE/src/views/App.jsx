/* eslint-disable indent */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import '../assets/css/bootstrap.min.css';
import '../assets/scss/now-ui-kit.scss?v=1.5.0';
import '../assets/demo/demo.css?v=1.5.0';
import '../assets/demo/nucleo-icons-page-styles.css?v=1.5.0';


import Index from './pages/landing/Index';
import Home from './pages/landing/Home';
import Search from './pages/landing/search/Search';
import Services from './pages/landing/Services';
import FromKH from './pages/staff/fromKH';
import Indexstaff from './pages/staff/Indexstaff';
import StaffHome from './pages/staff/StaffHome';
import FromDTK from './pages/staff/FromDTK';
import IndexLeader from './pages/leader/IndexLeader';
import LeaderAccount from './pages/leader/LeaderAccount';
import LeaderDashboard from './pages/leader/LeaderDashBoard';
import LeaderCreateAcc from './pages/leader/LeaderCreateAcc';
import LeaderEditAcc from './pages/leader/LeaderEditAcc';
import LeaderDGD from './pages/leader/LeaderDGD';
import LeaderCreateDGD from './pages/leader/LeaderCreateDGD';
import LeaderEditDGD from './pages/leader/LeaderEditDGD';
import LeaderCreateDTK from './pages/leader/LeaderCreateDTK';
import LeaderEditDTK from './pages/leader/LeaderEditDTK';
import ThongKe from '../pages/dashboard/ThongKe';
import TKDiemTK from '../pages/dashboard/ThongKe/TKDiemTK';
import TKDaGuiGD from '../pages/dashboard/ThongKe/TKDaGuiGD';
import TKKhachGuiGD from '../pages/dashboard/ThongKe/TKKhachGuiGD';
import TKToanQuoc from '../pages/dashboard/ThongKe/TKToanQuoc';
import StaffStatistic from './pages/staff/StaffStatistic';
import StaffNewOrder from './pages/staff/StaffNewOrder';
import IndexmanagerDTK from './pages/manager/managerDTK/IndexmanagerDTK';
import AccountDTK from './pages/manager/managerDTK/AccountDTK';
import StatisticDTK from './pages/manager/managerDTK/StatisticDTK';
import IndexmanagerDGD from './pages/manager/managerDGD/IndexmanagerDGD';
import StatisticDGD from './pages/manager/managerDGD/StatisticDGD';
import AccountDGD from './pages/manager/managerDGD/AccountDGD';
import ManagerDGDHome from './pages/manager/managerDGD/ManagerDGDHome';
import CreateAccDGD from './pages/manager/managerDGD/CreateAccDGD';
import ManagerDTKHome from './pages/manager/managerDTK/ManagerDTKHome';
import CreateAccDTK from './pages/manager/managerDTK/CreateAccDTK';
import Login from './pages/Login';
import LeaderDTK from './pages/leader/LeaderDTK';
// import TraCuuMVD from './pages/landing/Search/TraCuuMVD'
// import TimKiemDgd from './pages/landing/Search/TimKiemDgd'
// import UocTinhCuocPhi from './pages/landing/Search/UocTinhCuocPhi'
import IndexStaffDTK from './pages/staff/staffDTK/IndexStaffDTK';
import StaffDTKHome from './pages/staff/staffDTK/StaffDTKHome';
import DTKfromDTK from './pages/staff/staffDTK/DTKfromDTK';
import DTKfromDGD from './pages/staff/staffDTK/DTKfromDGD';


export const App = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Index />} >
                <Route index element={<Home />}/>
                <Route path='search' element={<Search />}/>
                    {/* <Route path='search/vd' element={<TraCuuMVD />}/>
                    <Route path='search/dgd' element={<TimKiemDgd />}/>
                    <Route path='search/cuoc' element={<UocTinhCuocPhi />}/> */}
                <Route path='services' element={<Services />}/>
                <Route path='login' element={<Login />}/>

            </Route>

            <Route path='leader' element={<IndexLeader />}>
                <Route index element={<LeaderDashboard  />}/>
                <Route path='statistics' element={<TKToanQuoc/>} />
                <Route path='account' element={<LeaderAccount />} />
                <Route path='editaccount' element={<LeaderEditAcc />} />
                <Route path='create' element={<LeaderCreateAcc />} />
                <Route path='DTK' element={<LeaderDTK />} />
                <Route path='createDTK' element={<LeaderCreateDTK />} />
                <Route path='editdtk' element={<LeaderEditDTK/>} />
                <Route path='DGD' element={<LeaderDGD />} />
                <Route path='createDGD' element={<LeaderCreateDGD />} />
                <Route path='editdgd' element={<LeaderEditDGD/>} />
            </Route>
            
            <Route path='staff' element={<Indexstaff />}>
                <Route index element={<StaffHome />}/>
                <Route path='fromKH' element={<FromKH />}/>
                <Route path='neworder' element={<StaffNewOrder/>}/>
                <Route path='fromDTK' element={<FromDTK />}/>
                <Route path='statistics' element={<StaffStatistic />}/>
            </Route>

            <Route path='staffDTK' element={<IndexStaffDTK />}>
                <Route index element={<StaffDTKHome />}/>
                <Route path='fromDGD' element={<DTKfromDGD />}/>
                <Route path='fromDTK' element={<DTKfromDTK />}/>
            
            </Route>

            <Route path='managerDTK' element={<IndexmanagerDTK />}>
                <Route index element={<ManagerDTKHome  />}/>
                <Route path='account' element={<AccountDTK />} />
                <Route path='createacc' element={<CreateAccDTK />} />
                <Route path='statistics' element={<StatisticDTK />}/>
            </Route>
            
            <Route path='managerDGD' element={<IndexmanagerDGD />}>
                <Route index element={<ManagerDGDHome  />}/>
                <Route path='account' element={<AccountDGD />} />
                <Route path='createacc' element={<CreateAccDGD />} />
                <Route path='statistics' element={<StatisticDGD />}/>
            </Route>
            
        </Routes>

    </BrowserRouter >
    )
}


