import React from 'react'
import CIcon from '@coreui/icons-react'
import menu from "./images/menu.png";
import restaurant from "./images/restaurant.png";
import qr from "./images/qr.png";
import dashboard from "./images/dashboard.png";
import order from "./images/order.png";
import t from "../utils/language";
const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: t('Dashboard'),
    role: 3,
    to: '/dashboard',
    icon:  <img style={{flex: "0 0 21px", marginRight: 8, marginLeft : 0}} className="c-sidebar-nav-icon" src={dashboard} />
  },
  {
    _tag: 'CSidebarNavItem',
    name: t('Restaurant'),
    role: 3,
    to: '/profile/update',
    icon: <img style={{flex: "0 0 21px", marginRight: 8 , marginLeft : 0}} className="c-sidebar-nav-icon" src={restaurant} />
  },
  {
    _tag: 'CSidebarNavItem',
    name: t('Orders'),
    role: 2,
    to: '/order',
    icon: <img style={{flex: "0 0 21px", marginRight: 8 , marginLeft : 0}} className="c-sidebar-nav-icon" src={order} />
  },
  {
    _tag: 'CSidebarNavItem',
    name: t('Menu Management'),
    role: 3,
    to: '/menu-management',
    icon: <img style={{flex: "0 0 21px", marginRight: 8, marginLeft : 0}} className="c-sidebar-nav-icon" src={menu} />
  },
  {
    _tag: 'CSidebarNavItem',
    name: t('Manage Menu QR'),
    role: 3,
    to: '/qr',
    icon:  <img style={{flex: "0 0 21px", marginRight: 8, marginLeft : 0}} className="c-sidebar-nav-icon" src={qr} />
  },
  {
    _tag: 'CSidebarNavItem',
    name: t('Manage Wifi QR'),
    role: 3,
    to: '/wifi',
    icon:  <img style={{flex: "0 0 21px", marginRight: 8, marginLeft : 0}} className="c-sidebar-nav-icon" src={qr} />
  },
  {
    _tag: 'CSidebarNavItem',
    role: 2,
    name: t('Analytics'),
    to: '/analytics',
    icon:  <img style={{flex: "0 0 21px", marginRight: 8, marginLeft : 0}} className="c-sidebar-nav-icon" src={menu} />
  },
]

export default _nav
