import { Route } from 'react-router-dom';
import React from 'react';

import DashboardPage from './components/pages/DashboardPage';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import UserRoute from './components/routes/UserRoute';

const App = () => 
<div className="ui container">
<Route path="/" exact component={HomePage} />
<Route path="/login" exact component={LoginPage} />
<UserRoute path="/dashboard" exact component={DashboardPage} />
</div>;

export default App;
