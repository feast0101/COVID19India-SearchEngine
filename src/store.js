import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const middleware = applyMiddleware(thunk);

export const store = createStore(reducers, middleware);