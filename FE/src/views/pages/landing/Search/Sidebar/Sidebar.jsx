import React from 'react';
import '../../../../../assets/css/Sidebar.css'
import { Link } from 'react-router-dom';
import Storefront from '@mui/icons-material/Storefront'
import PaidIcon from '@mui/icons-material/Paid'
import SearchIcon from '@mui/icons-material/Search'
// import Cookies from 'js-cookie';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavLink
} from 'reactstrap';


function Sidebar() {
  // const isTokenExpired = (token) => {
  //   const decodedToken = jwt_decode(token);
  //   const currentTime = Date.now() / 1000; // Chia cho 1000 để chuyển đổi từ milliseconds sang giây
  //   return decodedToken.exp < currentTime;
  // };

  // const handleNavLinkClick = () => {
  //   if (isTokenExpired(Cookies.get('jwt'))) {
  //     window.location.reload();
  //   }
  // };

  const handleNavLinkClick = (path) => {
    }
  return (
    <>
      <div className='sidebar'>
        <div className='sidebarWrapper'>
          <div className='sidebarMenu'>
            <h3 className='sidebarTitle'>TRA CỨU</h3>
            <ul className='sidebarList'>

              <NavLink to='vd' component={Link} onClick={() => handleNavLinkClick()} >
                <li className='sidebarListItem'>
                  <SearchIcon/>Tra cứu vận đơn
                </li>
              </NavLink>
              <NavLink to='dgd' tag={Link} onClick={() => handleNavLinkClick()}>
                <li className='sidebarListItem'>
                  <Storefront />Tra cứu Điểm Giao Dịch
                </li>
              </NavLink>
              <NavLink to='cuoc' tag={Link} onClick={() => handleNavLinkClick()}>
                <li className='sidebarListItem'>
                  <PaidIcon/> Ước tính cước phí
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
      <UncontrolledDropdown className='dropdownSidebar'>
        <DropdownToggle
          aria-expanded={false}
          aria-haspopup={true}
          caret
          color='info'
          data-toggle='dropdown'
          id='dropdownMenuButton'
          type='button'
        >
          TRA CỨU
        </DropdownToggle>
        <DropdownMenu aria-labelledby='dropdownMenuButton'>
          <DropdownItem to='vd' tag={Link} onClick={() => handleNavLinkClick()}>
            <SearchIcon/>Tra cứu vận đơn

          </DropdownItem>
        </DropdownMenu>
        <DropdownItem to='dgd' tag={Link} onClick={() => handleNavLinkClick()}>
          <Storefront />Tra cứu Điểm Giao Dịch
        </DropdownItem>
        <DropdownItem to='cuoc' tag={Link} onClick={() => handleNavLinkClick()}>
          <PaidIcon/> Ước tính cước phí
        </DropdownItem>
      </UncontrolledDropdown>
    </>
  )
}

export default Sidebar;