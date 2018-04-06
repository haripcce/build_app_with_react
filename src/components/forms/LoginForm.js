import React from 'react';
import { Button, Form, Message} from 'semantic-ui-react';
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
			this.setState({loading:true});
			this.props.submit(this.state.data)
			.catch(err => {
				
				this.setState({
				errors: {error:err.response.data.message},loading:false
			})
				//console.log(this.state);
		});
			}
	}

	validate = (data) => {
		const errors = {};
		
		if(!data.password) errors.password = 'Cant be blank';
		if(!Validator.isEmail(data.email)) errors.email = 'Invalid Email'
		
		return errors;
	}

    render() {
    	const {data,errors,loading} = this.state;
        return (
		<div>
		<Form onSubmit={this.onSubmit} loading={loading}>
		{errors.error}
		{errors.error && <Message negative><Message.Header>Something went wrong</Message.Header></Message>}
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
