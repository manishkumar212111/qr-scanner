const BASE_URL = 'https://restaurant-1e1l.onrender.com/' || 'http://localhost:5000/';
const REACT_BASE_URL = 'https://shop-d37b.onrender.com/';
const IMAGE_URL = "https://ik.imagekit.io/i2wp0fsg8dx/";
// const BASE_URL = 'http://localhost:5000/';

const getImageURL = (imgName) => IMAGE_URL.concat(imgName);

const EndPoints = {
    Users: {
        url: 'api/users',
    },
    Login : {
        url : "api/auth/login"
    },
    Logout : {
        url : "api/auth/logout"
    },
    Register : {
        url : "api/auth/register"
    },
    Forgot_Password : {
        url : "api/auth/forgot-password"
    },
    ResetPassword : {
        url : "/api/auth/reset-password"
    },
    VerifyOtp:{
        url : "/api/auth/verify-otp"
    },
    GetUserById : {
        url : "/api/users"
    },
    UpdateUserById : {
        url : "/api/users"
    },
    changePassword : {
        url : "/api/user/password"
    },
    changeEmail : {
        url : "/api/user/users/email"
    },
    DeleteAccount : {
        url : "/api/users"
    },
    GoogleLoginValidate : {
        url : "/api/auth/google/validate"
    },
    Plans: {
        url: 'api/plan',
    },
    Restaurants: {
        url: 'api/restaurant',
    },
    EmailTemplates : {
        url : "api/email-template"
    },
    Transactions: {
        url: 'api/transaction',
    },
    categoryList: {
        url: 'api/category',
    },
    orderList: {
        url: 'api/order',
    },
    productList:{
        url: 'api/product',
    },
    menuList:{
        url: 'api/menu',
    },
    modifierList:{
        url: 'api/modifier',
    },
    Notification:{
        url: 'api/notification',
    },
    Enquiry: {
        url: 'api/common/enquiry',
    },
    Home : {
        url : "api/common/dashboard"
    },
    HomeByDate: {
        url : "api/common/dashboard/bydate"
    },
    UpgradePlanRequest: {
        url: 'api/restaurant/user/subscription-request',
    },
    GetUserDetail:{
        url: "api/user/users/detail"
    }
};

export { BASE_URL, EndPoints, getImageURL, REACT_BASE_URL };
