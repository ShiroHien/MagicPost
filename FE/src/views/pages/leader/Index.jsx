import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"


import MainNavbar from "components/Navbars/MainNavbar";
import Footer from "components/Footer/Footer";

function Index() {
  return (
    <div>
      <MainNavbar />
      <Footer/>
    </div>

  )
}

export default index;