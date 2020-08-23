import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducer from './reducers/index.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||false;

const store = createStore(reducer, composeEnhancers === false ? applyMiddleware(reduxThunk):composeEnhancers(applyMiddleware(reduxThunk)));

export default store;