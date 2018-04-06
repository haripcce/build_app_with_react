import axios from 'axios';

export default {
	user:{
		login : (credentials) => 
		axios.post('/login', credentials).then(res => res.data.user)
	}
}