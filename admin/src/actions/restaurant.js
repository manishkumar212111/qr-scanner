import { setAlert } from "./alert";
import API from "../API";
// import { clearRestaurantData } from '../utils/globals'

export const getRestaurants = ( page = 1 , status=0) => ( dispatch ) =>{
  dispatch({
      type : "PAGE_LOADING",
      data : {}
  })
  API.get('Restaurants', {page : page,status: status} , "" , function(res){
    dispatch( 
      { type: "RESTAURANT_LIST",
        data : res.data
      }
    );
    dispatch({
      type : "REMOVE_LOADING",
      data : {}
    })
  })
}

export const updateStatus = ( id, data) => ( dispatch ) =>{
    dispatch({
      type : "PAGE_LOADING",
      data : {}
  })
  API.post('Restaurants' , data , id , function(res){
        
    if(res && res.data.id) {
        dispatch( 
          { type: "RESTAURANT_STATUS_UPDATED",
            data : res.data
          }
        );  
        dispatch(setAlert("Details updated successfully" , 'success'));    
      } else {
          //console.log(res.data.message);
          res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
      }
      dispatch({
        type : "REMOVE_LOADING",
        data : {}
      })
  })
}

export const GetRestaurantById = (restaurantId) => dispatch =>{
  try{
      dispatch({
          type : "RESTAURANT_DETAIL_LOADING",
          data : {}
      })
    API.get('GetRestaurantById' , {}, restaurantId , function(res){
      
      if(res && res.data){
          dispatch( { type: "RESTAURANT_DETAIL",
            data : res.data
          });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}

export const UpdateRestaurantById = (restaurantId , data) => dispatch =>{
    try{
        dispatch({
            type : "UPDATING_RESTAURANT",
            data : {}
        })
      API.patch('UpdateRestaurantById' , data , restaurantId , function(res){
        
        if(res && res.data.email) {
            dispatch( { type: "RESTAURANT_DETAIL",
              data : res.data
            });
            dispatch(setAlert("Details updated successfully" , 'success'));    
          } else {
              //console.log(res.data.message);
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
      })
      
    } catch (err) {
      console.log(err)
      console.log(err)
    }
  }
  
  export const changePassword = (data) => dispatch =>{
    try{
        dispatch({
            type : "UPDATING_RESTAURANT",
            data : {}
        })
      API.post('changePassword' , data , '' , function(res){
        console.log(res , "in change password");  
        if(res && res.data.email) {
            dispatch( { type: "RESTAURANT_DETAIL",
              data : res.data
            });
            dispatch(setAlert("Details updated successfully" , 'success'));    
          } else {
              //console.log(res.data.message);
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
      })
      
    } catch (err) {
      console.log(err)
      console.log(err)
    }
  }

  export const changeEmail = (data) => dispatch =>{
    try{
        dispatch({
            type : "UPDATING_RESTAURANT",
            data : {}
        })
      API.post('changeEmail' , data , '' , function(res){
        console.log(res , "in change password");  
        if(res && res.data.email) {
            dispatch( { type: "RESTAURANT_DETAIL",
              data : res.data
            });
            dispatch(setAlert("Details updated successfully" , 'success'));    
          } else {
              //console.log(res.data.message);
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
      })
      
    } catch (err) {
      console.log(err)
      console.log(err)
    }
  }

  export const deleteMyAccount = (restaurantId) => dispatch =>{
    try{
        dispatch({
            type : "UPDATING_RESTAURANT",
            data : {}
        })
      API.delete('DeleteAccount' , {} , restaurantId , function(res){
        console.log(res);
        if(res && res.data && !res.data.message) {
            dispatch( { type: "RESTAURANT_DETAIL",
                data : res.data
              });
            dispatch(setAlert("Account deleted successfully" , 'success'));    
            // clearRestaurantData();
              if(typeof window !== 'undefined'){
                window.location.href="/";
              }

          } else {
              //console.log(res.data.message);
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
      })
      
    } catch (err) {
      console.log(err)
      console.log(err)
    }
  }
  
  