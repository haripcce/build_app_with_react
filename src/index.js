import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk)));


ReactDOM.render(
	<BrowserRouter>
	<Provider store={store}><App /></Provider>
	</BrowserRouter>, 
	document.getElementById('root'));
registerServiceWorker();
