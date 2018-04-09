import { Button, Form, Message} from 'semantic-ui-react';
import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';

import PropTypes from 'prop-types';

import InlineError from '../messages/InlineError';

class SignupForm extends Component {
    
    state = {
    	data : {
			email:'',
			password:''
    	},
    	loading:false,
    	errors:{}
    }

    onChange = e => {
		const newInput = Object.assign({},
  		this.state.data, {[e.target.id]: e.target.value});
  		
    	this.setState({
      	data: newInput
    	});
	}

   	onSubmit = (e) => {
   		e.preventDefault();
		const errors = 	this.validate(this.state.data);
		this.setState({errors})
			if(Object.keys(errors).length === 0){
			this.setState({loading:true});
			this.props.submit(this.state.data)
			.catch(err => {
				
				this.setState({
				errors: err.response.data.errors,loading:false
			})
				//console.log(this.state);
		});
			}
	}
	validate = (data)=>{
		const errors = {};
		if(!isEmail(data.email)) errors.email = "Invalid email!";
		if(!data.password) errors.password = "Password Required!";

		return errors;
	}

    render() {
    	const {data, errors, loading} = this.state;
        return (
            <div>
            	<Form onSubmit={this.onSubmit} loading={loading}>
            	 <Form.Field error={!!errors.email} >
				      <label htmlFor="email">Email</label>
				      <input 
				      placeholder='example@example.com' 
				      id="email" 
				      type="email" 
				      name="email"
				      value={data.email}
				      onChange={this.onChange} />
		     {errors.email && <InlineError text={errors.email} />} 
		    	</Form.Field>

		    	<Form.Field error={!!errors.password}>
		      		   <label>Password</label>
				       <input 
				       placeholder='Make it secure' 
				      id="password" 
				      type="password" 
				      name="password"
				      value={data.password}
				      onChange={this.onChange}
				      />
		      {errors.password && <InlineError text={errors.password} />} 
		    </Form.Field>
				<Button primary>Sign Up</Button>
            	</Form>
            </div>
        );
    }
}
SignupForm.propTypes= {
	submit: PropTypes.func.isRequired
}

export default SignupForm;
