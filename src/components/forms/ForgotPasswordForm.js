import { Button, Form, Message } from 'semantic-ui-react';
import React, { Component } from 'react';
import Validator from 'validator';

import PropTypes from 'prop-types';

import InlineError from '../messages/InlineError';

class ForgotPasswordForm extends Component {

	state = {
		data:{
			email:''
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

	onSubmit = () => {
		const errors = 	this.validate(this.state.data);
		this.setState({errors})
			if(Object.keys(errors).length === 0){
			this.setState({loading:true});
			this.props.submit(this.state.data)
			.catch(err => {
				
				this.setState({
				errors: err.response.data.errors,loading:false
			})
		});
			}
	}
	validate = (data) => {
		const errors = {};
		if(!Validator.isEmail(data.email)) errors.email = 'Invalid Email'
		
		return errors;
	}

    render() {
    	const {errors, data, loading} = this.state;

        return (
            <div>
            	<Form onSubmit={this.onSubmit} loading={loading}>
            	{!!errors.global && <Message negative>{errors.global}</Message>}
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
            	<Button primary>Forgot Password</Button>
            	</Form>
            </div>
        );
    }
}

ForgotPasswordForm.propTypes= {
	submit: PropTypes.func.isRequired
}

export default ForgotPasswordForm;
