import { setAlert } from "./alert";
import API from "../API";
// import { clearUserData } from '../utils/globals'

export const getUsers = ( page = 1) => ( dispatch ) =>{
  dispatch({
      type : "PAGE_LOADING",
      data : {}
  })
  API.get('Users', {page : page, role: "user"} , "" , function(res){
    dispatch( 
      { type: "USER_LIST",
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
  API.patch('UpdateUserById' , data , id , function(res){
        
    if(res && res.data.email) {
        dispatch( 
          { type: "USER_STATUS_UPDATED",
            data : res.data
          }
        );  
        dispatch(setAlert("Details updated successfully" , 'success'));    
      } else {
          //console.log(res.data.message);
          res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
      }
  })
}

export const GetUserById = (userId) => dispatch =>{
  try{
      dispatch({
          type : "USER_DETAIL_LOADING",
          data : {}
      })
    API.get('GetUserById' , {}, userId , function(res){
      
      if(res && res.data){
          dispatch( { type: "USER_DETAIL",
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

export const UpdateUserById = (userId , data) => dispatch =>{
    try{
        dispatch({
            type : "UPDATING_USER",
            data : {}
        })
      API.patch('UpdateUserById' , data , userId , function(res){
        
        if(res && res.data.email) {
            dispatch( { type: "USER_DETAIL",
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
            type : "UPDATING_USER",
            data : {}
        })
      API.post('changePassword' , data , '' , function(res){
        console.log(res , "in change password");  
        if(res && res.data.email) {
            dispatch( { type: "USER_DETAIL",
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
            type : "UPDATING_USER",
            data : {}
        })
      API.post('changeEmail' , data , '' , function(res){
        console.log(res , "in change password");  
        if(res && res.data.email) {
            dispatch( { type: "USER_DETAIL",
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

  export const deleteMyAccount = (userId) => dispatch =>{
    try{
        dispatch({
            type : "UPDATING_USER",
            data : {}
        })
      API.delete('DeleteAccount' , {} , userId , function(res){
        console.log(res);
        if(res && res.data && !res.data.message) {
            dispatch( { type: "USER_DETAIL",
                data : res.data
              });
            dispatch(setAlert("Account deleted successfully" , 'success'));    
            // clearUserData();
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

  export const getUserDetail = (user) => dispatch => {
      API.get('GetUserDetail' , {user:user}, '' , function(res){
        console.log(res?.data, "Mnhh")
        if(res?.data){
          console.log("flkvjdlfjv lkjlk");
          let userDetail = localStorage.getItem("userDetail") ? JSON.parse(localStorage.getItem("userDetail")): {};
            localStorage.setItem("userDetail", JSON.stringify({...userDetail, ...res.data}))
          } else {
              //console.log(res.data.message);
              // res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
      })
  }
  
  