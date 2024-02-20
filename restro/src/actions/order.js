import { setAlert } from "./alert";
import API from "../API";
// import { clearUserData } from '../utils/globals'

export const getOrderList = (options = {} , loading=true) => dispatch =>{
  try{
    let restaurantDetail =
      localStorage.getItem("userDetail") &&
      JSON.parse(localStorage.getItem("userDetail"))
        ? JSON.parse(localStorage.getItem("userDetail")).restaurant
        : {};
    options.restaurant= restaurantDetail.id;    
    // options.sortBy = "orderNo:desc"
    options.limit = 12;
    loading && dispatch({
          type : "ORDER_DETAIL_LOADING",
          data : true
      })
    API.get('orderList' , options, '' , function(res){
      
      if(res && res.data){
          dispatch( { type: "ORDER_LIST",
            data : res.data
          });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

      dispatch({
        type : "ORDER_DETAIL_LOADING",
        data : false
      })
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}

export const deleteOrderById = (id , options) => dispatch =>{
  try{
      dispatch({
          type : "ORDER_DETAIL_LOADING",
          data : true
      })
    API.delete('orderList' , {}, id , function(res){
      
      if(res && res.data){
          dispatch(setAlert("order deleted successfully" , 'success'));    
          dispatch(getOrderList(options))
          // dispatch( { type: "ORDER_LIST",
          //   data : res.data
          // });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

      dispatch({
        type : "ORDER_DETAIL_LOADING",
        data : false
      })
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}


  export const createOrder = (data={}) => dispatch =>{
    try{
        dispatch({
            type : "ORDER_DETAIL_LOADING",
            data : true
        });
        data.menu = data.menu ? data.menu : localStorage.getItem("currentMenu")    

      API.post('orderList' , data , '' , function(res){
        if(res && res.data && res.data.id) {
            // dispatch(getOrderByUserId());
            dispatch(setAlert("Order added" , 'success'));
            dispatch(getOrderList())
            // setTimeout(() => {
            //   window.location.href="/#/order";
            // }, 1000)
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
              type : "ORDER_DETAIL_LOADING",
              data : false
          })
      })
      
    } catch (err) {
      
    }
  }

  export const getOrderById = (orderId) => dispatch =>{
    try{
        dispatch({
            type : "ORDER_DETAIL_LOADING",
            data : true
        })
      API.get('orderList' , {}, orderId , function(res){
        
        if(res && res.data){
            dispatch( { type: "SINGLE_ORDER_DETAIL",
              data : res.data
            });
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
              type : "ORDER_DETAIL_LOADING",
              data : false
          })
      })
      
    } catch (err) {
      
    }
  }

  export const updateOrderById = (orderId , data, id) => dispatch =>{
    try{
        dispatch({
            type : "UPDATING_ORDER",
            data : id
        })
      API.patch('orderList' , data , orderId , function(res){
        
        if(res && res.data.id) {
            dispatch({
                type : "ORDER_UPDATE_SUCCESS",
                data : res.data
            })  
          } else {
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
            type : "UPDATING_ORDER",
            data : false
          })
      })
      
    } catch (err) {
      
    }
  }

  
  
  