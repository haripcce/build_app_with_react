import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';
import api from '../api'
import decode from 'jwt-decode';
//export const login = (credentials) => () =>api.user.login(credentials).then(res => res.data.user);

export const userLoggedIn = (user) => ({
	type:USER_LOGGED_IN,
	user
})

export const userLoggedOut = (user) => ({
	type:USER_LOGGED_OUT
})
export const login = credentials => dispatch =>
api.user.login(credentials).then(user => {
	localStorage.bookwormJWT = user.token;
	dispatch(userLoggedIn(user));

})	

export const logout = () => dispatch =>{
	localStorage.removeItem('bookwormJWT');
	dispatch(userLoggedOut());


}

export const confirm = (token) => dispatch =>
	api.user.confirm(token).then(user => {
	localStorage.bookwormJWT = user.token;
	const payload = decode(localStorage.bookwormJWT)
	const userData = {token:localStorage.bookwormJWT, email:payload.sub, confirmed:payload.confirmed };
	dispatch(userLoggedIn(userData));
});

	

