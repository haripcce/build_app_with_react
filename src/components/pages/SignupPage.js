import { connect } from 'react-redux';
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { signup } from '../../actions/users';
import SignupForm from '../forms/SignupForm';

class SignupPage extends Component {
	submit = (data) => this.props.signup(data).then(() => this.props.history.push("/dashboard"));

    render() {
        return (
          <div>
          	<SignupForm submit={this.submit}  />
          </div>  
        );
    }
}

SignupPage.propTypes= {
	signup: PropTypes.func.isRequired,
	history: PropTypes.shape({
	  shape: PropTypes.func.isRequired
	}).isRequired
}

export default connect(null, {signup})(SignupPage);