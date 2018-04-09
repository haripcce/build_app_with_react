import { Route } from 'react-router-dom';
import React from 'react';

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';

const App = () => 
<div className="ui container">
<Route path="/" exact component={HomePage} />
<Route path="/login" exact component={LoginPage} />
<Route path="/dashboard" exact component={DashboardPage} />
</div>;

export default App;
