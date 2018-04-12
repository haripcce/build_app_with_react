import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ConfirmationPage from './components/pages/ConfirmationPage';
import DashboardPage from './components/pages/DashboardPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import GuestRoute from './components/routes/GuestRoute';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import NewBookPage from './components/pages/NewBookPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import SignupPage from './components/pages/SignupPage';
import TopNavigation from './components/navigation/TopNavigation';
import UserRoute from './components/routes/UserRoute';
import { fetchCurrentUser } from './actions/users';
import Loader from 'react-loader';



class App extends Component {

	componentDidMount(){
	if(this.props.isAuthenticated) this.props.fetchCurrentUser();

	}

	render() {
		const {location,isAuthenticated,loaded} = this.props;
		return (
			<div className="ui container">
			<Loader loaded={loaded}>
			{isAuthenticated && <TopNavigation />}

			<Route      location={location} path="/" exact component={HomePage} />
			<Route      location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
			<GuestRoute location={location} path="/forgot_password" exact component={ForgotPasswordPage} />
			<GuestRoute location={location} path="/reset_password/:token" exact component={ResetPasswordPage} />
			<GuestRoute location={location} path="/login" exact component={LoginPage} />
			<GuestRoute location={location} path="/signup" exact component={SignupPage} />
			<UserRoute  location={location} path="/dashboard" exact component={DashboardPage} />
			<UserRoute  location={location} path="/books/new" exact component={NewBookPage} />
			</Loader>
			</div>
		);
	}
}

App.propTypes= {
	location: PropTypes.shape({
	  pathname: PropTypes.string.isRequired
	}).isRequired,
	 isAuthenticated: PropTypes.bool.isRequired,
	 fetchCurrentUser: PropTypes.func.isRequired,
	 loaded : PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
	isAuthenticated: !!state.user.email,
	loaded : state.user.loaded
  };
}
export default connect(mapStateToProps,{fetchCurrentUser})(App);
