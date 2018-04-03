import React from 'react';
import { Button, Form} from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
   
	state = {
	data:{
		email:'',
		password:''
	},
	loading:false,
	errors : {}
	}

	onChange = e => {
		const newInput = Object.assign({},
  		this.state.data, {[e.target.id]: e.target.value});
    	
    	this.setState({
      	data: newInput
    	});
	}

	onSubmit = () => {
		const errors = 	this.validate(this.state.data);
		this.setState({errors})
		 if(Object.keys(errors).length === 0){
			
			this.props.submit(this.state.data);
  }
	}

	validate = (data) => {
		const errors = {};
		
		if(!data.password) errors.password = 'Cant be blank';
		if(!Validator.isEmail(data.email)) errors.email = 'Invalid Email'
		
		return errors;
	}

    render() {
    	const {data,errors} = this.state;
        return (
		<div>
		<Form onSubmit={this.onSubmit}>
		    <Form.Field error={!!errors.email} >
		      <label htmlFor="email">Email</label>
		      <input 
		      placeholder='example@example.com' 
		      id="email" 
		      type="email" 
		      name="email"
		      value={data.email}
		      onChange={this.onChange} />
		     {errors.email && <InlineError text={errors.email}></InlineError>} 
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
		      {errors.password && <InlineError text={errors.password}></InlineError>} 
		    </Form.Field>
		   
    <Button type='submit'>Submit</Button>
</Form>
		</div>  
        );
    }
}

LoginForm.propTypes= {
	submit: PropTypes.func.isRequired
}

export default LoginForm;
