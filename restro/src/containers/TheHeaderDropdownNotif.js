import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { connect } from 'react-redux'
import { getNotifications , updateNotification} from 'src/actions/notification'
import { useHistory } from 'react-router';
import MP3 from "./pristine-609.mp3"
import t from 'src/utils/language';
import moment from 'moment'
import { cilClock } from '@coreui/icons'

var temp = 0;
const TheHeaderDropdownNotif = (props) => {
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    temp =0;
    props.getNotifications()
    // {isOpened: false}
  }, [props.getNotifications]);

  useEffect(() => {
    const interval = setInterval(() => {
      temp = 1;
      props.getNotifications();
      // {isOpened: false}
      console.log("New notification")
    }, 30000);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  useEffect(() => {
    if(props.notifications?.length != 0 && notifications?.length < props.notifications?.length && temp == 1){
      document.getElementById("test").click()
      const audio = new Audio(MP3);
      audio.addEventListener('canplaythrough', (event) => {
        // the audio is now playable; play it if permissions allow
        // audio.muted=true
        audio.play();
      });
    }
    setNotifications(props.notifications)
  }, [props.notifications])
  
  const handleClick = (itm) => {
      // props.updateNotification(itm.id);
      history.push("/order");
  };

  const handleNotifClick = () => {
    console.log("nofiii")
    props.updateNotification({all : true});
  }
  console.log(notifications)
  let count = notifications && notifications.filter(itm => !itm.isOpened).length;
  return (
    <CDropdown
      inNav
      id="test"
      className="c-header-nav-item mx-2"
      style={{marginTop: 7}}
    >
      <CDropdownToggle onClick={handleNotifClick} className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell"/>
        <CBadge shape="pill" color="danger">{count}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu  placement="bottom-end" className="pt-0" style={{maxHeight: 500, overflowY: "auto"}}>
        <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>{t("You have")} {notifications?.length} {t("new notifications")}</strong>
        </CDropdownItem>
        {notifications?.length ? notifications?.map(itm => (
          <><CDropdownItem style={{paddingTop: 10}} onClick={() => handleClick(itm)}>
              
              <h6><CIcon height="20" name="cil-speedometer" className="mr-2 text-warning" />{itm.title}</h6>
              <p className="text-muted " style={{marginBottom: 4}}>{itm.description}</p>
              <small >{moment(itm.createdAt).fromNow()}</small>
            </CDropdownItem>
          </>          
        )) : <>
        {/* <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>You have no new notifications</strong>
        </CDropdownItem> */}
        
        </>}
        {/* <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>Server</strong>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>CPU Usage</b></small>
          </div>
          <CProgress size="xs" color="info" value={25} />
          <small className="text-muted">348 Processes. 1/4 Cores.</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>Memory Usage</b></small>
          </div>
          <CProgress size="xs" color="warning" value={70} />
          <small className="text-muted">11444GB/16384MB</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>SSD 1 Usage</b></small>
          </div>
          <CProgress size="xs" color="danger" value={90} />
          <small className="text-muted">243GB/256GB</small>
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  )
}

const mapStateToProps = ( state ) => ( {
  notifications: state.notification.notifications,
  loading : state.Home.loading
} );

const mapDispatchToProps = {
  getNotifications,
  updateNotification 
};

export default connect( mapStateToProps, mapDispatchToProps )( TheHeaderDropdownNotif );
