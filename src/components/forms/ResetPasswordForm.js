import { Button, Form, Message } from 'semantic-ui-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InlineError from '../messages/InlineError';

class ResetPasswordForm extends Component {
	state = {
		data:{
			token:this.props.token,
			password:'',
			passwordConfirmation:''
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
		if(!data.password) errors.password = 'cant be blank';
		if(data.password !== data.passwordConfirmation) errors.password ='password must match';
		
		return errors;
	}
    render() {
    	const {loading,data,errors} = this.state;
        return (
            <div>
            	<Form onSubmit={this.onSubmit} loading={loading}>
            	{!!errors.global && <Message negative>{errors.global}</Message>}
            	<Form.Field error={!!errors.email} >
						<label htmlFor="email">New Password</label>
						<input 
						placeholder='New password' 
						id="password" 
						type="password" 
						name="password"
						value={data.password}
						onChange={this.onChange} />
		     {errors.password && <InlineError text={errors.password} />} 
		    </Form.Field>
		    <Form.Field error={!!errors.email} >
						<label htmlFor="passwordConfirmation">Confirm new Password</label>
						<input 
						placeholder='Confirm New Password' 
						id="passwordConfirmation" 
						type="password" 
						name="passwordConfirmation"
						value={data.passwordConfirmation}
						onChange={this.onChange} />
		     {errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />} 
		    </Form.Field>
            	<Button primary>Reset</Button>
            	</Form>
            </div>
        );
    }
}
ResetPasswordForm.propTypes= {
	submit: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired
}


export default ResetPasswordForm;
