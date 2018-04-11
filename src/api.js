import axios from 'axios';

export default {
	user:{
		login : (credentials) => 
		axios.post('/login', credentials).then(res => res.data.user),
		signup : (user) => 
		axios.post('/users/sign-up', user).then(res => res.data.user),
		confirm : (token) => 
		axios.post('/users/confirm', {token}).then(res => res.data.user),
		reset_PasswordRequest : ({email}) => 
		axios.post('/users/reset_password_request', {email}),
		validate_token:(token) => 
		axios.post('/users/validate_token', {token}),
		reset_password:(data) => 
		axios.post('/users/reset_password', data)
	},
	books:{
		fetchAll: () => 
		axios.get('/tasks').then(res => res.data.books),
		create : (book) => 
		axios.post('/tasks',book).then(res => res.data)
	}
}