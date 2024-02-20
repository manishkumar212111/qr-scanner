import { setAlert } from "./alert";
import API from "../API";

export const getProductByUserId = (options = {}) => dispatch =>{
  try{
      
    dispatch({
      type : "PRODUCT_LIST_LOADING",
      data : true
    })
    API.get('ProductList' , options, '' , function(res){
      
      if(res && res.data){
          dispatch( { type: "PRODUCT_LISTING",
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

export const getRestaurantById = (id, tokenId) => dispatch =>{
  try{
      dispatch({
          type : "PRODUCT_DETAIL_LOADING",
          data : true
      });

    API.get('Restaurant' , {clientId : tokenId}, id , function(res){
      console.log(res?.data?.expire);
      if(res?.data?.expire){
        console.log("expire")
        dispatch( { type: "RESTAURANT_EXPIRE",
          data : res.data
        });
        return;
      }
      if(res?.data?.alreadyOrdered){
        dispatch( { type: "RESTAURANT_ALREADY_USED",
          data : res.data
        });
        return;
      }
      if(res && res.data){
          dispatch( { type: "RESTAURANT_DETAIL",
            data : res.data
          });
        } else {
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }
        dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : false
        })
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}

export const getProductById = (productId) => dispatch =>{
  try{
      dispatch({
          type : "PRODUCT_DETAIL_LOADING",
          data : true
      })
    API.get('ProductDetail' , {}, productId , function(res){
      
      if(res && res.data){
          dispatch( { type: "SINGLE_PRODUCT_DETAIL",
            data : res.data
          });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }
        dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : false
        })
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}

export const getUserConfig = (userName) => dispatch =>{
  try{
    dispatch({
        type : "PRODUCT_DETAIL_LOADING",
        data : true
    })
    API.get('UserConfig' , {userName : userName}, '' , function(res){
      
      if(res && res.data){
          dispatch( { type: "USER_CONFIG",
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


  