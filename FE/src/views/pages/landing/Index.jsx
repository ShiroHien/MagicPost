import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom'
import Navbar from '../../../components/Navbars/Navbar'
import Footer from '../../../components/Footer/Footer'
import Home from "./Home";

 const Index = () => (
  <>
    <Navbar></Navbar>
    <Home/>
    <Footer/>
  </>
)
export default Index

