import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter,Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import decode from 'jwt-decode';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import { userLoggedIn } from './actions/auth';
import { fetchCurrentUser } from './actions/users';

import App from './App';
import {userFetched} from './actions/auth';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer'
import setAuthorizationHeader from './utils/setAuthorizationHeader';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk)));

if(localStorage.bookwormJWT){
	setAuthorizationHeader(localStorage.bookwormJWT);
	store.dispatch(fetchCurrentUser());
}else{
	store.dispatch(userFetched({}));
}

ReactDOM.render(
	<BrowserRouter>
	<Provider store={store}><Route component={App} /></Provider>
	</BrowserRouter>, 
	document.getElementById('root'));
registerServiceWorker();
