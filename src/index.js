import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
//import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import AjaxWrapper from './api/AjaxWrapper';
import {HEAP_DETAILS} from './config/config';
import Unauthorized from './components/common/error/unauthorized/Unauthorized';
AjaxWrapper.get(`${HEAP_DETAILS}`)
.then((response) => {
        if(response.apiError === undefined || response["email"]) {
           /*return render(
                <Unauthorized/>,
                document.getElementById('root')
            )*/
            window.heap.load(response.heapKey);
            window.heap.identify(response.fmno);
            window.heap.addUserProperties({'mck-email-address': response.email, 'mck-name': decodeURIComponent(response.name)});
        }
        //console.log(response)
       
        return render(
            <App/>,
            document.getElementById('root')
        );
});
