import { userLoggedIn, userFetched } from './auth';
import api from '../api';

export const fetchCurrentUser = () => (dispatch) => 
	api.user.fetchCurrentUser().then((user) => dispatch(userFetched(user)));



export const signup = (data) => (dispatch) => 
	api.user.signup(data).
	then( user => {
		localStorage.bookwormJWT = user.token;
		dispatch(userLoggedIn(user))
	});




