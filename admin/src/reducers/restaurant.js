
const initialState = {
    restaurantDetail: [],
    restaurant_detail_loading : true,
    restaurants: [],
    totalPages : 1
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case 'RESTAURANT_DETAIL_LOADING' : 
            return {...state , restaurant_detail_loading : true};
        case 'RESTAURANT_DETAIL':
          return {...state , restaurantDetail : data , restaurant_detail_loading : false};
        case "RESTAURANT_LIST":
          return {...state, restaurants :  data.results, totalPages : data.totalPages};
        case "RESTAURANT_STATUS_UPDATED":
          return {...state,
             restaurants :  state.restaurants.map(itm => itm.id === data.id
              ? { ...itm, ...data }
              : itm)};

        default: return state;
    }
  }
  