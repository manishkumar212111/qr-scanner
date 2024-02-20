import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';

import { getRestaurants , updateStatus } from "../../actions/restaurant";
import { connect } from "react-redux";

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CSpinner,
  CSwitch,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import Detail from './Detail';


const getBadge = status => {
  if(status){
    return 'success'
  } else {
    return 'danger'
  }
}

const Restaurants = (props) => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [restaurants , setRestaurant] = useState(props.restaurants)
  const [content , setContent] = useState(null)

  console.log(props)
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/restaurants/${props.match.params.status}?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page]);

  useEffect(() => {
    setRestaurant(props.restaurants)
  }, [props.restaurants]);

  useEffect(() => {
    props.getRestaurants(currentPage, props.match.params.status == 'pending' ? 0 : 1 );
  }, [props.getRestaurants , currentPage, props.match.params.status]);
  
  const handleStatusChange =(status , id) => {
    console.log(id)
    props.updateStatus(id , {status: status ? 0 : 1});
    setContent(null)
  }
  if(props.loading){
    return (
        <CSpinner
            color="primary"
            style={{width:'4rem', height:'4rem', margin:"30% 50%" }}
        />
    )
  }
  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
        <CModal
            size="xl"
            centered
            show={content}
            onClose={setContent}
          >
            <CModalHeader closeButton>Restaurant Detail</CModalHeader>
            <CModalBody>
              <Detail content={content} approveCb={handleStatusChange}/>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={setContent}
              >Close</CButton>
            </CModalFooter>
          </CModal>
          <CCardHeader>
            Restaurants
            {/* <small className="text-muted"> example</small> */}
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={restaurants}
            fields={[
              { key: 'name',label:'Name', _classes: 'font-weight-bold' },
              //{ key: 'manager_name',label:'Manager Name', _classes: 'font-weight-bold' },
              'email', 'city', 'Orders','status', 'action'
            ]}
            hover
            striped
            // itemsPerPage={1}
            // activePage={currentPage}
            // columnFilter
            // tableFilter
            // clickableRows
            // onRowClick={(item) => history.push(`/restaurants/${item.id}`)}
            scopedSlots = {{
              'action':
                (item)=>(
                  <td>
                    <span style={{ cursor : "pointer" }} onClick={() => setContent(item)}>View</span>
                    {/* <CSwitch onChange={(e) => handleStatusChange(item.status, item.id)} variant="3d" checked={item.status} color="success" size="lg" shape="pill"/> */}
                  </td>
                ),
                'status':
                (item, index)=>{
                  return(<td>{item.status ? "Active" : "Inactive"}</td>)
                },
                'email':
                (item, index)=>{
                  return(<td>{item.user?.email}</td>)
                },
                'Orders':
                (item, index)=>{
                  return(<td><Link to={`/order/${item.id}`}>View</Link></td>)
                }
            }}
          />
          <CPagination
            activePage={currentPage}
            onActivePageChange={pageChange}
            pages={props.totalPages}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

const mapStateToProps = ( state ) => ( {
  restaurants: state.restaurant.restaurants,
  totalPages: state.restaurant.totalPages,
  loading : state.Home.loading

} );

const mapDispatchToProps = {
  getRestaurants,
  updateStatus
};

export default connect( mapStateToProps, mapDispatchToProps )( Restaurants );


