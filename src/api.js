import axios from 'axios';

export default {
	user:{
		login : (credentials) => 
		axios.post('/login', credentials).then(res => res.data.user),
		signup : (user) => 
		axios.post('/users/sign-up', user).then(res => res.data.user),
		confirm : (token) => 
		axios.post('/users/confirm', {token}).then(res => res.data.user)
	}
}