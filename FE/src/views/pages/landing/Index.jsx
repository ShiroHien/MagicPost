import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom'
import Navbar from '../../../components/Navbars/Navbar'
import Footer from '../../../components/Footer/Footer'
import Home from "./Home";

 const Index = () => (
  <>
    <Navbar></Navbar>
    <div className="spaceHeader"></div>
      <div className="bodyContainer">
          <Outlet/>
      </div>
    <Footer/>
  </>
)
export default Index

