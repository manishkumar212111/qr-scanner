import React , { useEffect } from 'react';
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const TheHeaderDropdown = (props) => {

  const [user , setUser] = React.useState({})
  
  useEffect(() => {
    let users = props.userDetail && props.userDetail.user ? props.userDetail : localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')); 
   let userDetail = users ? users.user : false;
   if(userDetail){
     setUser(userDetail); 
   } else {
    window.location.href="/#/login";
   }  
  } , [props.userDetail])

  const logout = () => {
   let refreshToken = localStorage.getItem('userDetail') ? JSON.parse(localStorage.getItem('userDetail')).tokens.refresh.token : false;
    props.logout({refreshToken : refreshToken})
  }
  console.log(props)
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <strong>{user.first_name}</strong>
          {/* <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt={user.email}
          /> */}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center c-header-nav-link"
        >
          <span  style={{cursor: "pointer"}} onClick={logout}>
            <strong>Logout</strong>
          </span>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

const mapStateToProps = ( state ) => ( {
  userDetail: state.auth.userDetail,
} );

const mapDispatchToProps = {
  logout
};

export default connect( mapStateToProps, mapDispatchToProps )( TheHeaderDropdown );

