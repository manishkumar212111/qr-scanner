import { API_BASE_URL } from "../config";

const IMAGE_URL = "https://ik.imagekit.io/i2wp0fsg8dx/";
const BASE_URL = 'https://restaurant-1e1l.onrender.com' || 'http://localhost:5000/';
// const BASE_URL = 'http://localhost:5000/';


const getImageURL = (imgName) => IMAGE_URL.concat(imgName);

const EndPoints = {
    ProductList: {
        url: "api/common/product"
    },
    Restaurant: {
        url: "api/common/restaurant"
    },
    Orders:{
        url: "api/common/order"
    },
    CreatePayment: {
        url: "api/payment/checkout"
    }
    
};

export { BASE_URL, EndPoints, getImageURL };