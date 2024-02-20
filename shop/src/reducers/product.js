
const initialState = {
    productList: [],
    product_detail_loading : false,
    restaurantExpire:false,
    restaurantAlreadyUsed: false
  };
  
  export default function ProductReducer(state = initialState, action) {
    const { type , data } = action;
    console.log(data);
    switch ( type ) {
        case 'RESTAURANT_EXPIRE':
          return {...state, restaurantExpire : true , product_detail_loading : false}
        case 'RESTAURANT_ALREADY_USED':
          return {...state, restaurantAlreadyUsed : true , product_detail_loading : false}
        case 'SET_ALERT':
          return {...state, productDetail : data , product_detail_loading : false}
        case 'PRODUCT_DETAIL_LOADING' : 
            return {...state , product_detail_loading : data};
        case 'PRODUCT_LIST_LOADING' : 
          return {...state , product_list_loading : data};
            
        case 'PRODUCT_LISTING':
          return {...state , productList : data.results , product_list_loading : false};
        case 'RESTAURANT_DETAIL':
          localStorage.setItem("restaurant", JSON.stringify(data));
          return {...state , restaurant : data ,restaurantExpire:false, product_list_loading : false};
        default: return state;
    }
  }
  