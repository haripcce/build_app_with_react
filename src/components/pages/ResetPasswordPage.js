import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { resetPassword, validateToken } from '../../actions/auth';
import ResetPasswordForm from '../forms/ResetPasswordForm';

class ResetPasswordPage extends Component {

	state = {
			loading:true,
			success:false
	}
	submit = (data) => this.props.resetPassword(data).then(() => this.props.history.push("/login"));

	componentDidMount(){
		this.props.validateToken(this.props.match.params.token)
		.then(() => this.setState({success:true,loading:false}))
		.catch(err => this.setState({loading:false}));
	}

    render() {
    	const {loading , success} = this.state;
    	const token = this.props.match.params.token;

        return (
            <div>
            	{loading && <Message>Loading</Message>}
            	{!loading && success &&  <ResetPasswordForm submit={this.submit} token={token} />}
            	{!loading && !success &&  <Message>Invalid Token</Message>}
            </div>
        );
    }
}

ResetPasswordPage.propTypes = {
	validateToken: PropTypes.func.isRequired,
	match: PropTypes.shape({
	  params: PropTypes.shape({
	    token: PropTypes.string.isRequired
	  }).isRequired
	}).isRequired
}

export default connect(null,{validateToken,resetPassword})(ResetPasswordPage);
