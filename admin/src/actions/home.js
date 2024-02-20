import { setAlert } from "./alert";
import API from "../API"

export const fetchData = ( ) => ( dispatch ) =>{
  API.get('Users', {} , "" , function(res){
    dispatch( 
      { type: "STORE_DATA",
        data : res.data
      }
    );
  })
}

export const getHomePageData = () =>( dispatch ) => {
  try{
    dispatch({
        type : "PAGE_LOADING",
        data : {}
    })
    API.get('Home' , {}, '' , function(res){
      
      if(res && res.data){
          dispatch( { type: "HOME",
            data : res.data
          });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

        dispatch({
            type : "REMOVE_LOADING",
            data : {}
        })
    })

    } catch (err) {

    dispatch({
        type : "REMOVE_LOADING",
        data : {}
    })
    console.log(err)
    console.log(err)
    }
} 

export const getHomePageDataByDate = (options = {}) =>( dispatch ) => {
  try{
    dispatch({
        type : "PAGE_LOADING",
        data : {}
    });
    
    API.get('HomeByDate' , options, '' , function(res){
      
      if(res && res.data){
          dispatch( { type: "HOME",
            data : res.data
          });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

        dispatch({
            type : "REMOVE_LOADING",
            data : {}
        })
    })

    } catch (err) {

    dispatch({
        type : "REMOVE_LOADING",
        data : {}
    })
    console.log(err)
    console.log(err)
    }
} 