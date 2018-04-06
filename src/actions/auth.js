import {USER_LOGGED_IN} from '../types';
import api from '../api'

//export const login = (credentials) => () =>api.user.login(credentials).then(res => res.data.user);

export const userLoggedIn = (user) => ({
	type:USER_LOGGED_IN,
	user
})
export const login = (credentials) => (dispatch) =>{
return api.user.login(credentials).then(user => dispatch(userLoggedIn(user)))	
}
