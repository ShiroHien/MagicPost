import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "./pages/landing/Index";
import Search from "./pages/landing/search/Search";
import Services from "./pages/landing/Services";
import TraCuuMVD from "./pages/landing/Search/TraCuuMVD";
import TimKiemBuuCuc from "./pages/landing/search/TimKiemBuuCuc";


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
        </Routes>
        
        
    </BrowserRouter >
    )
}


