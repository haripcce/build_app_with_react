import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import { userLoggedIn } from './actions/auth';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer'

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk)));

if(localStorage.bookwormJWT){
	const user = {token:localStorage.bookwormJWT };
	store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
	<BrowserRouter>
	<Provider store={store}><App /></Provider>
	</BrowserRouter>, 
	document.getElementById('root'));
registerServiceWorker();
