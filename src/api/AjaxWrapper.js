import "isomorphic-fetch";
import setApiMock from '../apiMock/setApiMock';

setApiMock()

const checkResponse = (res, jsonify) => {

   if(res.status !== 200) {
      return {'apiError': res.status, 'response': res};
   }
   return jsonify ? res.json() : res;
};
const AjaxWrapper = {
    getSolr: path => fetch(`solr${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        credentials: "include"
    }).then((res) => {
        return checkResponse(res, true);
    }).catch((err) => {
        return {'apiError': err};
    }),
    get: path => fetch(`${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
        }
    }).then((res) => {
         return checkResponse(res, true);
    }).catch((err) => {
        return {'apiError': err};
    }),
    post: (path, body) => fetch(`${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(body),
        credentials: "include"
    }).then((res) => {
        return checkResponse(res, true);
    }).catch((err) => {
        return {'apiError': err};
    }),
    postMultiPart: (path, body) => fetch(`${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },

        body: body,
        credentials: "include"
    }).then((res) => {
        return checkResponse(res, true);
    }).catch((err) => {
        return {'apiError': err};
    }),
    options: path => fetch(`${path}`, {
    method: 'OPTIONS',
    credentials: "include"
    }).then((res) => {
        return checkResponse(res, true);
    }).catch((err) => {
        return {'apiError': err};
    })
};

export default AjaxWrapper;
