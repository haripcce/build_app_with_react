import { Link } from 'react-router-dom';
import React from 'react';

const HomePage = () => (
        <div>
        	<h1>Home Page</h1>
        	<Link to="/login">Login</Link>
        </div>
    );

export default HomePage;
