import decode from 'jwt-decode';

import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';
import { reset_PasswordRequest } from './auth';
import api from '../api'
import setAuthorizationHeader from '../utils/setAuthorizationHeader';
import { USER_FETCHED } from './../types';

export const userLoggedIn = (user) => ({
	type:USER_LOGGED_IN,
	user
});

export const userFetched = (user) => ({
	type : 	USER_FETCHED,
	user 
	});

export const userLoggedOut = (user) => ({
	type:USER_LOGGED_OUT
})
export const login = credentials => dispatch =>
api.user.login(credentials).then(user => {
	localStorage.bookwormJWT = user.token;
	setAuthorizationHeader(localStorage.bookwormJWT);
	const payload = decode(localStorage.bookwormJWT)
	const userData = {token:localStorage.bookwormJWT, email:payload.sub, confirmed:payload.confirmed,loaded:true };
	dispatch(userLoggedIn(userData));

})	

export const logout = () => dispatch =>{
	localStorage.removeItem('bookwormJWT');
	setAuthorizationHeader();
	dispatch(userLoggedOut());


}

export const confirm = (token) => dispatch =>
	api.user.confirm(token).then(user => {
	localStorage.bookwormJWT = user.token;
	const payload = decode(localStorage.bookwormJWT)
	const userData = {token:localStorage.bookwormJWT, email:payload.sub, confirmed:payload.confirmed };
	dispatch(userLoggedIn(userData));
});

export const resetPasswordRequest = ({email}) => () =>
	api.user.reset_PasswordRequest({email});

export const validateToken = (token) => () =>
	api.user.validate_token(token);

export const resetPassword = (data) => () =>
	api.user.reset_password(data);


	

