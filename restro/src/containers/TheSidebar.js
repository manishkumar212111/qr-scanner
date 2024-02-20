import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import CloudMenu from "./images/CloudMenu.png";

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.changeState.sidebarShow)
  
  const getUserRole = (obj) => {
    let user = localStorage.getItem("userDetail") ? JSON.parse(localStorage.getItem("userDetail")).user : {};
    console.log(user)
    return obj.filter(itm => user.features?.viewOrder ? itm.role >=2 : itm.role>= 3)
  }

  console.log(show, "sdvbdfhjhjh")
  return (
    <CSidebar
      // style={{backgroundColor : "white", boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)" , width: 290, }}
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" 
      // style={{color: "black", backgroundColor: "white",flex: "0 0 75px"}} 
      to="/#/dashboard">
        {/* CLOUD MENU */}
        <img
          className="c-sidebar-brand-full"
          src="/images/logo.png"
          // height={21}
          width={150}
        />
        
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={getUserRole(navigation)}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default TheSidebar
