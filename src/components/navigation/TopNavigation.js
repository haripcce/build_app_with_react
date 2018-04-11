import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import gravatarUrl from 'gravatar-url';

import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';



const TopNavigation = ({ user, logout }) => (
        <div>
        	<Menu secondary pointing>
				<Menu.Item as={Link} to="/dashboard">
				Dashboard
				</Menu.Item>

				<Menu.Menu position="right">
					<Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />} >
						<Dropdown.Menu>
						 	 <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
    			</Menu.Menu>
        	</Menu>
        </div>
    );



TopNavigation.propTypes = {
   user : PropTypes.shape({
     email : PropTypes.string.isRequired
   }).isRequired,
   logout: PropTypes.func.isRequired
};

function mapStateToProps(state){
  return{
    user: state.user
  }
};
export default connect(mapStateToProps,{logout})(TopNavigation);
