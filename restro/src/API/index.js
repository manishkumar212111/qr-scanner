import axios from 'axios';
import { BASE_URL, EndPoints } from './config';

const getLoggedInUserToken = () => {
    return typeof localStorage !== 'undefined' && localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')).tokens.access.token;
}

const SECONDS = 30;
const MILISECONDS = 1000;
const TIMEOUT = SECONDS * MILISECONDS;

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
        'content-type':'application/json',
        'Authorization' : 'Bearer ' + getLoggedInUserToken()
        //'content-type':'application/x-www-form-urlencoded'
    },
});

const API = {
    get: (key, params = {}, id , cb) => {
        const url = EndPoints[key].url + (id ? `/${id}` : "");
        return instance.get(url, {
            params,
            headers: {
                'content-type':'application/json',
                'Authorization' : 'Bearer ' + getLoggedInUserToken()
            },
        }).then(res => {
            cb(res);
        }).catch(err => {
            cb(err.response);
            console.log(err.response)
        });;
    },

    post: (key, data = {}, id = '' , cb , contentType) => {
        const url = EndPoints[key].url + (id ? `/${id}` : "");
        console.log('POST',url);
        console.log(contentType)
        return instance({
            'method': 'POST',
            'url': url,
            'data': data,
            headers: {
                'content-type':contentType ? contentType : 'application/json',
                'Authorization' : 'Bearer ' + getLoggedInUserToken()
            },
        }).then(res => {
            cb(res);
        }).catch(err => {
            cb(err.response);

            console.log(err.response)
        });
    },
    put: (key, data = {}, id = '' , cb , contentType) => {
        const url = EndPoints[key].url + (id ? `/${id}` : "");
        console.log('PUT',url);
        console.log(contentType)
        return instance({
            'method': 'PUT',
            'url': url,
            'data': data,
            headers: {
                'content-type':contentType ? contentType : 'application/json',
                'Authorization' : 'Bearer ' + getLoggedInUserToken()
            },
        }).then(res => {
            cb(res);
        }).catch(err => {
            cb(err.response);

            console.log(err.response)
        });
    },

    patch: (key, data = {}, id = '', cb) => {
        const url = EndPoints[key].url + (id ? `/${id}` : "");
        console.log('PATCH',url);
        return instance({
            'method': 'PATCH',
            'url': url,
            'data': data,
            headers: {
                'content-type':'application/json',
                'Authorization' : 'Bearer ' + getLoggedInUserToken()
            },
        }).then(res => {
            cb(res);
        }).catch(err => {
            cb(err.response);

            console.log(err.response)
        });
    },

    delete: (key, data = {}, id = '' , cb) => {
        const url = EndPoints[key].url + (id ? `/${id}` : "");
        console.log('delete',url);
        return instance({
            'method': 'DELETE',
            'url': url,
            'data': data,
            headers: {
                'content-type':'application/json',
                'Authorization' : 'Bearer ' + getLoggedInUserToken()
            },
        }).then(res => {
            cb(res);
        }).catch(err => {
            cb(err.response);

            console.log(err.response)
        });
    },
    // get : function (key, params = {}){
    //     return new Promise((resolve, reject) => {
    //         this._get(key, params = {})
    //         .then( data => resolve(data))
    //         .catch( error => reject(error));
    //     })
    // },

    // post : function (key, data = {}, id = ''){
    //     return new Promise((resolve, reject) => {
    //         this._post(key, data, id)
    //         .then( data => resolve(data))
    //         .catch( error => reject(error));
    //     })
    // }

};
export default API;