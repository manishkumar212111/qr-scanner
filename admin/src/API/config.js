const BASE_URL = 'http://localhost:5000/';
const IMAGE_URL = "https://ik.imagekit.io/i2wp0fsg8dx/";

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
    orderList: {
        url: 'api/order',
    },
    GetUserById : {
        url : "/api/users"
    },
    HomeByDate: {
        url : "api/common/dashboard/bydate"
    },
    UpdateUserById : {
        url : "/api/users"
    },
    UpdateExpiry : {
        url : "/api/users/users/updateExpiry"
    },
    changePassword : {
        url : "/api/user/password"
    },
    changeEmail : {
        url : "/api/user/email"
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
    Cmss: {
        url: 'api/cms',
    },
    EmailTemplates : {
        url : "api/email-template"
    },
    Transactions: {
        url: 'api/transaction',
    },
    Enquiry: {
        url: 'api/enquiry',
    },
    Home : {
        url : "api/common/dashboard"
    },
    Restaurants: {
        url: 'api/restaurants',
    },
};

export { BASE_URL, EndPoints, getImageURL };