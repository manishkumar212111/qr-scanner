import React, { lazy , useEffect, useState} from 'react';
import { getHomePageData } from "../../actions/home";
import { connect } from "react-redux";
import "./style.scss";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CSpinner
} from '@coreui/react';

import first from "./images/$.svg";
import second from "./images/report.svg";
import revenue from "./images/revenue.png";
import order from "./images/orders.png";
import { CChartBar, CChartDoughnut } from '@coreui/react-chartjs';
import t from 'src/utils/language';

//generete Label


const Dashboard = (props) => {
  console.log(props)
  const [data, setData] = useState({});
  const [revenueInWeek , setRevenueInWeek] = useState([])  
  const [orderInWeek , setOrderInWeek] = useState([])  
  
  useEffect(() => {
    props.getHomePageData()
  }, [props.getHomePageData])

  useEffect(() => {
        let userDetail = localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')) ? JSON.parse(localStorage.getItem('userDetail')).user: {};
        let restaurantDetail = localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')) ? JSON.parse(localStorage.getItem('userDetail')).restaurant: {};
        
        if(!(userDetail.status && restaurantDetail && restaurantDetail.status)){
            if(!restaurantDetail?.id){
                window.location.href = '/';
                return;
            }
            window.location.href = '/#/profile/update';
        }
    }, [])

  const GetDays = (d,Mention_today=false, itm)=>{
    //Mention today mean the array will have today date
    const NameOfMonths = [t("Jan"), t("Feb"), t("Mar") , t("Apr"), t("May"), t("Jun"), t("Jul"), t("Aug"), t("Sep"), t("Oct"), t("Nov"), t("Dec")] 
    var DateArray = [];
    var days=d;
    for(var i=0;i<days;i++){
    if(!Mention_today && i==0){i=1;days+=1}
    var date = new Date();
    var last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
    var day =last.getDate();
    var month=last.getMonth()+1;
    var year=last.getFullYear();
    const fulld = (Number(day)+'-'+ Number(month)+'-'+Number(year)) // Format date as you like
    var obj = {key: (Number(day)+'-'+ NameOfMonths[Number(month)-1]+'-'+Number(year)) , value: itm[fulld] || 0}
    DateArray.push(obj);
    }
    return DateArray;
  }

    
  useEffect(()=>{
    if(props?.data?.result){
        setData(props?.data?.result);
        setRevenueInWeek(props?.data?.result.revenueInWeek);
        setOrderInWeek(props?.data?.result.orderInWeek);
    } 
  }, [props?.data])


  if(props.loading){
    return ( <CSpinner
      color="primary"
      style={{width:'4rem', height:'4rem', margin:"30% 50%" }}
  />)
  }
  let user = localStorage.getItem("userDetail") ? JSON.parse(localStorage.getItem("userDetail")).user : {};
  if(!user?.features.viewOrder){
      return(
        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        {t("You can not view dashboard, Please contact admin")}
        </div>
      )
  };
  return (
    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
      <div class="dashboard-container">
        <div class="row py-4 justify-content-center">
            <div class="row col-12">
                <div class="col-12 col-lg-6 mb-4">
                    <div class="dashboard-details-container">
                        <div class="row dashboard-details-container-title mb-5">
                            {t("Today’s Revenue")}
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="row dashboard-details-container-value">
                                    {(data.todayRevenue || 0).toFixed(2) } 
                                </div>
                                <div class="row">                                    
                                    {/* <button type="button" class="btn dashboard-details-container-btn">View All</button> */}
                                </div>
                            </div>
                            <div class="col-6 d-flex justify-content-end">
                                <img src={first} alt="" class="dashboard-details-container-icon" />
                            </div>
                        </div>
                    </div>
                </div>             
                <div class="col-12 col-lg-6 mb-4">
                    <div class="dashboard-details-container dashboard-details-container-orders">
                        <div class="row dashboard-details-container-title mb-5">
                            {t("Today’s Orders")}
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="row dashboard-details-container-value">
                                {data.todayOrder || 0 } 
                                </div>
                                <div class="row">
                                    {/* <button type="button" class="btn dashboard-details-container-btn dashboard-details-container-btn-orders">View All</button> */}
                                </div>
                            </div>
                            <div class="col-6 d-flex justify-content-end">
                                <img src={second} alt="" class="dashboard-details-container-icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="row col-12">
                <div class="col-12 col-lg-6 mb-4">
                    <div class="dashboard-details-container dashboard-details-container-revenue">
                        <div class="row dashboard-details-container-title mb-4">
                            {t("Total Revenue Last 7 Days")} ({t("$")} {(data.totalRevenue || 0).toFixed(2) })
                        </div>
                        <div class="row">
                        <CCard>
                            <CCardBody>
                            <CChartBar
                                datasets={[
                                    {
                                        label: t('Revenue'),
                                        backgroundColor: '#f87979',
                                        // data: [10,344,500]
                                        data: revenueInWeek.map(itm => itm.value)
                                    }
                                ]}
                                labels={revenueInWeek.map(itm => itm.key.split("-")[0] + "-" + itm.key.split("-")[1])}
                                options={{
                                    
                                    scales: {
                                        yAxes: [{
                                        ticks: {
                                          max: revenueInWeek.map(itm => itm.value).sort().lastItem || 50,
                                          min: 0,
                                          stepSize: parseInt(revenueInWeek.map(itm => itm.value).sort().lastItem / 5) || 1,
                                          reverse: false,
                                          beginAtZero: true
                                        }
                                      }]
                                    },
                                    
                                tooltips: {
                                    enabled: true
                                }
                                }}
                            />
                            </CCardBody>
                        </CCard>

                            {/* <img src={revenue} alt="" style={{width: "100%"}} /> */}
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6 mb-4">
                    <div class="dashboard-details-container dashboard-details-container-orders dashboard-details-container-orders-bottom">
                        <div class="row dashboard-details-container-title mb-4">
                            {t("Total Orders Last 7 Days")} ({data.totalOrder})
                        </div>
                        <div class="row">
                        <CCard>
                            <CCardBody>
                            <CChartBar
                                datasets={[
                                    {
                                        label: t('Order'),
                                        backgroundColor: '#f87979',
                                        data: orderInWeek.map(itm => itm.value)
                                    }
                                ]}
                                labels={orderInWeek.map(itm => itm.key.split("-")[0] + "-" + itm.key.split("-")[1])}
                                options={{
                                    scales: {
                                        yAxes: [{
                                        ticks: {
                                          max: orderInWeek.map(itm => itm.value).sort().lastItem || 50,
                                          min: 0,
                                          stepSize: parseInt(orderInWeek.map(itm => itm.value).sort().lastItem / 5) || 1,
                                          reverse: false,
                                          beginAtZero: true
                                        }
                                      }]
                                    },
                                    maintainAspectRatio: true,
                                    tooltips: {
                                        enabled: true
                                    }
                                }}
                            />
                            </CCardBody>
                        </CCard>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  )
}


const mapStateToProps = ( state ) => ( {
  data: state.Home.data,
  loading : state.Home.loading
} );

const mapDispatchToProps = {
  getHomePageData
};

export default connect( mapStateToProps, mapDispatchToProps )( Dashboard );
